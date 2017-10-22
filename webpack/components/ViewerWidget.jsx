import React, { Component } from 'react';
import GithubRepo from '../lib/github.js';
import CategoriesConfig from "../config/categories.js";
import swal from 'sweetalert2';


class ViewerWidget extends Component {
  constructor(props) {
    super(props);

    // Extract params from URL
    var search = location.search.substring(1);
    if (!_.isEmpty(search)) {
      var params = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    } else {
      swal({
        title: 'Il y a un problème !',
        text: "Vous essayez de voir un document qui n'existe pas.",
        type: 'error',
        confirmButtonText: 'Revenir à la page précédente'
      }).then(() => window.history.back());
    } 


    // Get the path
    var path = params.document;
    // Get the basename with extension
    var basename = _.last(path.split("/"));
    
    var basename_split = basename.split('.');
    // Extract extension
    var extension = basename_split.pop();
    // Normalzie name
    var name = basename_split.join(".").split(/-|_/).join(' ');

    this.state = {
      containerHeight: 1350,
      containerHeight: 960,
      document: {
        name: name,
        description: null,
        primary_category: params.primary_cat,
        categories: [ "prod-cnt", params.cat ],
        path: path,
        extension: extension,
        modified_at: null,
        user: {
          name: "Anonymous",
          email: null
        }
      }
    };
  };

  updateDimensions = () => {
    const width = $(this.refs.viewerContainer).width();
    const height = Math.floor(width * 1.414);
    this.setState({ containerWidth: width, cointainerHeight: height });
  };

  componentDidMount = () => {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  };
  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateDimensions);
  };

  componentWillMount = () => {
    this.updateDimensions();

    var file = this.state.document;
    GithubRepo.client.listCommits({path: file.path}, (error, commits) => {
      var message = "Pas de description";

      if (!_.isEmpty(commits)) {
        // take the first commit
        var commit = _.last(commits).commit;
        console.log(commit);
        message = commit.message;

        file.modified_at = new Date(commit.author.date);
        file.user = {
          name: commit.author.name,
          email: commit.author.email
        };
      }
      file.description = message;

      this.setState({ documents: file });  
    });

  };

  render() {
    var document = this.state.document;
    var primary_cat = CategoriesConfig.PRIMARY_DISPLAY[document.primary_category];
    var category = _.last(document.categories);
    var color = CategoriesConfig.COLORS[category];

    console.log(document);
    return (
      <div>
        <div className={`viewer-header ${color}-border`}>
          <img className="img-responsive center-block" src={`assets/images/pictos/picto-${document.primary_category}-${color}.png`} />
          <div className="viewer-primary">
            {primary_cat}
          </div>
          <div className={`viewer-document-name ${color}-font`}>
          </div>
          <div className={`viewer-category ${color}`}>
            {category}
          </div>
        </div>
        <div className="viewer-container" ref="viewerContainer">
          <iframe src={`/js/vendor/ViewerJS/#../../../${document.path}`} width={this.state.containerWidth} height={this.state.containerHeight} allowFullScreen></iframe>
        </div>
        <div className="viewer-description">
          {document.description}
          <a href={`/${document.path}`} download>Télécharger</a>
        </div>
        <div className="viewer-user">
          Created by {document.user.name} on {document.modifier_at}
        </div>
      </div>
    );
  }

}

export default ViewerWidget;
