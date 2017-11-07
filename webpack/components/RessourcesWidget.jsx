import React, { Component } from 'react';
import moment from 'moment';
import DocumentThumb from './DocumentThumb.jsx';
import StackGrid from "react-stack-grid";
import GithubRepo from '../lib/github.js';
import CategoriesConfig from "../config/categories.js";

class RessourcesWidget extends Component {
  EXTENSIONS_WHITELIST = ['JPG','JPEG', 'PNG', 'PDF', 'ODP', 'ODT', 'ODS', 'DOC', 'PPTX', 'XLS'];

  constructor(props) {
    super(props);

    this.state = {
      search_filter: null,
      fullsearch: props.fullsearch == "" ? false : true,
      list_mode: false, 
      container_width: 700, // Used for pinterest type display to be responsive
      max_displayed: (!_.isNumber(props.max) && _.isEmpty(props.max)) ? null : parseInt(props.max),
      category: "prod-cnt",
      documents: this.normalizeData(props.dataSet)
    };
  };

  normalizeData(array) {
    // Only take files that have the right extension
    var whitelisted = _.filter(array, (object) => _.includes(this.EXTENSIONS_WHITELIST, object.extname.replace(".", "").toUpperCase()));

    return _.map(whitelisted, (object) => {
      return {
        name: object.basename,
        description: null,
        primary_category: CategoriesConfig.PRIMARY[object.path.split("/")[2].toLowerCase()],
        categories: [ "prod-cnt", CategoriesConfig.SECONDARY[object.path.split("/")[3].toLowerCase()] ],
        path: object.path.replace(/^\//, ""), // removes the first /
        extension: object.extname,
        modified_at: object.modified_time
      };

    });
  };

  updateDimensions = () => {
    this.setState({ container_width: $(this.refs.container).width() });
  };
  componentWillMount = () => {
    // Responsiveness
    this.updateDimensions();

    // Fetch search bar data if needed
    if (this.state.fullsearch) {
      // URL Params
      var search = location.search.substring(1);
      if (!_.isEmpty(search)) {
        var params = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
        this.setState({ search_filter: params.search });
      }
    }

    // Fetch more data from github API
    var docs = this.state.documents;

    // TODO: Should be batch
    _.each(docs, (file) => {
      GithubRepo.client.listCommits({path: file.path}, (error, commits) => {
        var message = "Pas de description";
        var date = Date.now();

        if (!_.isEmpty(commits)) {
          // take the first commit
          var commit = _.last(commits).commit;
          message = commit.message;
          date = (commit.committer && commit.committer.date) || date;

        }
        file.description = message;
        file.modified_at = new Date(date);

        this.setState({ documents: docs });  
      });
    });

  };

  componentDidMount = () => {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  };
  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateDimensions);
  };

  // Event listener that selects a category
  categorySelect = (e) => {
    var el = $(e.target);
    this.setState({ category: el.data('category') });
  };

  gridToggle = (e) => {
    this.setState({ list_mode: false });
    setTimeout(() => this.grid.updateLayout(), 400); // Because animation makes weird things sometimes

  }
  listToggle = (e) => {
    this.setState({ list_mode: true });
  };

  filterByName = (e) => {
    var value = this.refs.search.value;
    value = _.isEmpty(value) ? '' : $.trim(value);
    this.setState({ search_filter: (_.isEmpty(value) ? null : value) });

    // Updates url if we are in fullsearch mode and the browser can handle it
    if (this.state.fullsearch && history.pushState) {
      var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?search=' + value;
      window.history.pushState({ path: newurl }, '', newurl);
    }
  };


  // Renders a list of document
  documentsList = () => {
    // Only take files that are in the selected category 
    var for_current_category = _.filter(this.state.documents, (document) => _.includes(document.categories, this.state.category));

    if (this.state.search_filter) {
      var documents_list = _.filter(for_current_category, (document) => new RegExp(this.state.search_filter, "im").test(document.name));
    } else {
      var documents_list = for_current_category;
    }

    // Sort by date
    documents_list = _.sortBy(documents_list, [function(doc) { return -doc.modified_at; }]);

    // If we need to display only 6 for instance
    if (this.state.max_displayed) {
      documents_list = _.take(documents_list, this.state.max_displayed);
    }

    return _.map(documents_list, (document, key) => {
      return <DocumentThumb key={key} {...document} />;
    });
  };

  isSelectedClass(category) {
    return this.state.category == category ? `cat-active ${category}` : category;
  };

  render() {
    if (this.state.list_mode) {
      var htmlDocumentsList = (
        <div className="imgSwitch documents-thumbnails-container">
          <div className="row row-list" ref="container">
            {this.documentsList()}
          </div>
          {this.state.fullsearch ? '' : <div className="loadit"><a href="/search.html" className="btn btn-primary">Afficher tout</a></div>}
        </div>
      );
    } else { // Grid mode
      var htmlDocumentsList = (
        <div className="imgSwitch documents-thumbnails-container">
          <div className="row" ref="container">
            <StackGrid columnWidth={(this.state.container_width - 20) / 4} gutterHeight={5} gridRef={grid => this.grid = grid}>
              {this.documentsList()}
            </StackGrid>
          </div>
          {this.state.fullsearch ? '' : <div className="loadit"><a href="/search.html" className="btn btn-primary">Afficher tout</a></div>}
        </div>
      );
    }

    return (
      <div className="glView">
        <div className="switcher">
          <ul>
            <li onClick={this.gridToggle} className={`grid ${!this.state.list_mode ? 'grid-active' : ''}`}><i className="fa fa-th-large"></i></li>
            <li onClick={this.listToggle} className={`list ${this.state.list_mode ? 'list-active' : ''}`}><i className="fa fa-align-justify"></i></li>
          </ul>
        </div>
        <div className="ressources-search">
          <input type="text" ref="search" onChange={this.filterByName} onKeyPress={this.filterByName} className="search-bar form-control" value={this.state.search_filter || ''} placeholder="Tapez ici: organiser un barcamp, ..."/>
        </div>
        <div className={`menuSwitch ${this.state.fullsearch ? 'hide' : ''}`}>
          <ul>
            <li className={`all ${this.isSelectedClass('prod-cnt')}`}
                onClick={this.categorySelect}
                data-category="prod-cnt">
              Toutes
            </li>
            <li className={`${CategoriesConfig.COLORS['creativite']}-border ${CategoriesConfig.COLORS['creativite']}-bg-hover ${this.isSelectedClass('creativite')}`}
                onClick={this.categorySelect}
                data-category="creativite">
              Créativité
            </li>
            <li className={`${CategoriesConfig.COLORS['juridique']}-border ${CategoriesConfig.COLORS['juridique']}-bg-hover ${this.isSelectedClass('juridique')}`}
                onClick={this.categorySelect}
                data-category="juridique">
              Juridique
            </li>
            <li className={`${CategoriesConfig.COLORS['marches']}-border ${CategoriesConfig.COLORS['marches']}-bg-hover ${this.isSelectedClass('marches')}`}
                onClick={this.categorySelect}
                data-category="marches">
              Marchés publics
            </li>
            <li className={`${CategoriesConfig.COLORS['documentation']}-border ${CategoriesConfig.COLORS['documentation']}-bg-hover ${this.isSelectedClass('documentation')}`}
                onClick={this.categorySelect}
                data-category="documentation">
              Documentation
            </li>
            <li className={`${CategoriesConfig.COLORS['parangonnage']}-border ${CategoriesConfig.COLORS['parangonnage']}-bg-hover ${this.isSelectedClass('parangonnage')}`}
                onClick={this.categorySelect}
                data-category="parangonnage">
              Parangonnage
            </li>
            <li className={`${CategoriesConfig.COLORS['technologies']}-border ${CategoriesConfig.COLORS['technologies']}-bg-hover ${this.isSelectedClass('technologies')}`}
                onClick={this.categorySelect}
                data-category="technologies">
              Technologies
            </li>
            <li className={`${CategoriesConfig.COLORS['communication']}-border ${CategoriesConfig.COLORS['communication']}-bg-hover ${this.isSelectedClass('communication')}`}
                onClick={this.categorySelect}
                data-category="communication">
              Communication
            </li>
            <li className={`${CategoriesConfig.COLORS['lieux']}-border ${CategoriesConfig.COLORS['lieux']}-bg-hover ${this.isSelectedClass('lieux')}`}
                onClick={this.categorySelect}
                data-category="lieux">
              Lieux et Evénements
            </li>
            <li className={`${CategoriesConfig.COLORS['inventions']}-border ${CategoriesConfig.COLORS['inventions']}-bg-hover ${this.isSelectedClass('inventions')}`}
                onClick={this.categorySelect}
                data-category="inventions">
              Inventions
            </li>
            <li className={`${CategoriesConfig.COLORS['autres']}-border ${CategoriesConfig.COLORS['autres']}-bg-hover ${this.isSelectedClass('autres')}`}
                onClick={this.categorySelect}
                data-category="autres">
              Autres
            </li>

          </ul>
        </div>
        {htmlDocumentsList}
      </div>
    );
  }
};

export default RessourcesWidget;
