import React, { Component } from 'react';
import GithubRepo from '../lib/github.js';
import CategoriesConfig from "../config/categories.js";
import swal from 'sweetalert2';
import moment from 'moment';

class ViewerWidget extends Component {
  HANDLED_EXTENSIONS = {
    viewerjs: ["PDF", "ODT", "ODS", "ODP", "ODG"," ODC", "ODF", "ODB", "ODI", "ODM", "OTT", "OTS", "OTP", "OTG"],
    microsoft: ["DOC", "DOCX", "PPT", "PPTX", 'XLS', 'XLSX'],
    images: ["PNG", "JPG", "JPEG", "GIF"]
  };
  

  constructor(props) {
    super(props);

    // Extract params from URL
    var search = location.search.substring(1);
    if (!_.isEmpty(search)) {
      var params = {};
      // Extract path separetaly, see below
      // Extract the rest in the object
      params = _.assign.apply(_,
                              _.map(search.match(/&(\w+)=(\w+)/g), function(pair) {
                                pair = pair.substring(1);
                                var keyvalue = pair.split("=");
                                var obj = {};
                                obj[keyvalue[0]] = keyvalue[1];
                                return obj;
                              })
                             );

      // Extract path separetaly because it can contain special characters, like & and =
      var _path = search.replace(search.match(/(&\w+=\w+)+$/ig)[0], '').split("=");
      _path.shift();
      _path = _path.join("=");
      params.document = decodeURI(_path);
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

    var _ext = extension.toUpperCase();
    // Check which handler is used for this document (viewerjs, microsoftviewer or just regular image)
    var handler = _.includes(this.HANDLED_EXTENSIONS['viewerjs'], _ext) && 'viewerjs'
        || _.includes(this.HANDLED_EXTENSIONS['microsoft'], _ext) && 'microsoft'
        || _.includes(this.HANDLED_EXTENSIONS['images'], _ext) && 'images'
        || null;

    this.state = {
      containerHeight: 1350,
      containerHeight: 960,
      handler: handler,
      document: {
        name: name,
        description: null,
        primary_category: params.primary_cat,
        categories: [ "prod-cnt", params.cat ],
        path: path,
        extension: extension,
        modified_at: null,
        user: {
          picture: 'assets/images/avatars/identicon.png',
          url: '#',
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
        // take and remove the first commit
        var data = commits.pop();

        const extractDataFromCommit = (data, object) => {
          var commit = data.commit;
          //console.log(data);
          object.description = commit.message;
          object.modified_at = new Date(commit.author.date);
          object.user = {
            picture: data.author ? `https://github.com/${data.author.login}.png` : object.user.picture, // Default picture 
            url: data.author ? data.author.html_url : '',
            name: commit.author ? commit.author.name : "Anonymous",
            email: commit.author ? commit.author.email : ''
          };
          return object;
        };

        // Update the document with data extracted from the first commit
        file = extractDataFromCommit(data, file);

        // Create document history
        file.history = _.map(commits, (commit) => extractDataFromCommit(commit, {}));

      } else {
        file.description = message;
      }

      this.setState({ documents: file });  
    });

  };

  render() {
    var document = this.state.document;
    var primary_cat = CategoriesConfig.PRIMARY_DISPLAY[document.primary_category];
    var category = _.last(document.categories);
    var color = CategoriesConfig.COLORS[category];
    console.log(document);

    var viewer = null;
    if (this.state.handler) {
      if (this.state.handler == "viewerjs") {
        viewer = (
          <iframe src={`/js/vendor/ViewerJS/#../../../${document.path}`} width={this.state.containerWidth} height={this.state.containerHeight} allowFullScreen></iframe>
        );
      } else if (this.state.handler == "images") {
        viewer = (
          <div>
            <img src={document.path} />
          </div>
        );
      } else if (this.state.handler == "microsoft") {
        // If needed we could also use the google drive
        // viewer instead: http://docs.google.com/gview?url=PATH_TO_DOC
        // Right now we are using microsoft official viewer to handle microsoft type documents
        viewer = (
          <div>
            <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${location.origin}/${document.path}`} width={this.state.containerWidth} height={this.state.containerHeight} allowFullScreen></iframe>
          </div>
        );
      }
    } else {
      viewer = (
        <div>
          Ce type de document n'est pas géré par notre visionneuse.<br />
          Vous pouvez cependant consulter le document en le téléchargeant directement.
        </div>
      );
    }


    // Make sure it is not null
    document.history = document.history || [];
    // History of commits
    const historyList = (
      <div className="viewer-history">
        <h3>Historique</h3>
        <ul className="list-history">
          {_.map(document.history, (commit, i) => (
            <li key={i} className="history-item">
              <div className="history-user">
                <img src={commit.user.picture} width="50" />
              </div>
              <div className="history-description">
                <a href={commit.user.url}>Par {commit.user.name} le {moment(commit.modified_at).format("DD/MM/YYYY - hh:mm:ss")}</a>
                {commit.description}
              </div>
            </li>
          ))
          }
        </ul>
      </div>
    );

    return (
      <div>
        <div className={`apie-header viewer-header ${color}-border`}>
          <img className="img-responsive center-block" src={`assets/images/pictos/picto-${document.primary_category}-${color}.png`} />
          <div className="viewer-primary page-category">
            {primary_cat}
            <div className="header-separator"></div>
          </div>
          <div className={`viewer-document-name page-title ${color}-font`}>
            {document.name}
          </div>
          <div className={`viewer-category ${color}`}>
            {category}
          </div>
        </div>
        <div className="viewer-container" ref="viewerContainer">
          {viewer}
        </div>
        <div className="viewer-description">
          {document.description}
          <span className="download-container">
            <a className={`download-link btn ${color}`} href={`/${document.path}`} download>
              Télécharger
            </a>
          </span>
        </div>
        <div className="viewer-user">
          <img src={document.user.picture} width="100"/>
          <div className="user-content">
            <h4>Document proposé par {document.user.name}</h4>
            <p>Créé le {moment(document.modified_at).format("DD/MM/YYYY - hh:mm:ss")}</p>
            <div className="links-container">
              <a className="user-contact btn btn-primary" href={`mailto:${document.user.email}`}>Contacter</a>
              <a className="user-link btn btn-primary" href={document.user.url}>Voir son profil</a>
            </div>
          </div>
        </div>
        {document.history.length > 0 ? historyList : ''}
      </div>
    );
  }

}

export default ViewerWidget;
