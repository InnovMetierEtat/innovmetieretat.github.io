/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 108);
/******/ })
/************************************************************************/
/******/ ({

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// We add an |apie| salt to the token so github doesn't delete it automaticaly (security measure)
var token = "dc|apie|534d6bb2a585a58910299bb3a4edc0cee18c|apie|0f";

// Removes the salt added to the token
var desalinize = function desalinize(t) {
  return t.replace("|apie|", "").replace("|apie|", "");
};

var github = new GitHub({ token: desalinize(token) });
var client = github.getRepo("InnovMetierEtat", "innovmetieretat.github.io");

// Get all commits
var GithubRepo = {
  client: client,
  get_files: function get_files(callback) {
    client.listCommits().then(function (commits) {
      var last_commit = _.last(commits.data);
      console.log(commits);
      client.getTree(last_commit.sha + "?recursive=1").then(function (response) {
        if (response.data && response.data.tree) {
          callback(_.filter(response.data.tree, function (file) {
            return file.path.match('^files/') && file.type == "blob";
          })); // Only files
        } else {
          callback([]);
        }
      });
    });
  }
};

exports.default = GithubRepo;

/***/ }),

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  // Helpful because the name of the folders can be complex and have accents
  // Primary categories (Methode, Model, usecase)
  PRIMARY: {
    "1.méthodes": "idea",
    "2.modèles": "model",
    "3.cas-d-usages": "usecase"
  },
  // Used for display in the HTML
  PRIMARY_DISPLAY: {
    "idea": "Méthode",
    "model": "Modèle de document",
    "usecase": "Cas d'usage"
  },

  SECONDARY: {
    "créativité": "creativite",
    "autres": "autres",
    "communication": "communication",
    "documentation": "documentation",
    "inventions": "inventions",
    "juridique": "juridique",
    "lieux et évènements": "lieux",
    "marchés publics": "marches",
    "parangonnage": "parangonnage",
    "technologie": "technologies"
  },

  // Color schema for every category, if you add new ones, add here and also in the HTML below
  COLORS: {
    creativite: "applegreen",
    autres: "black",
    communication: "lightorange",
    documentation: "blue",
    inventions: "lightgreen",
    juridique: "darkpurple",
    lieux: "yellow",
    marches: "greenblue",
    parangonnage: "lightbrown",
    technologies: "purple"
  }
};

/***/ }),

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(38);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _RessourcesWidget = __webpack_require__(208);

var _RessourcesWidget2 = _interopRequireDefault(_RessourcesWidget);

var _ViewerWidget = __webpack_require__(285);

var _ViewerWidget2 = _interopRequireDefault(_ViewerWidget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Extract attributes from the original html element and add them as react props
function renderWithProps(component, id) {
  var node = document.getElementById(id);
  var props = $(node).data() || {};
  // Extract potential data from inside the element
  var data = $(node).find('[data-set=true]').text();

  if (!_.isEmpty(data)) {
    data = JSON.parse(data);
  }
  props.dataSet = data;
  console.log(props);

  // Render to dom with props
  return _reactDom2.default.render(_react2.default.createElement(component, props, null), node);
};

// ---------------------------------------------
// ---------- Plug widgets in pages ------------
// ---------------------------------------------

// Ressources

var Ressources = function (_Component) {
  _inherits(Ressources, _Component);

  function Ressources() {
    _classCallCheck(this, Ressources);

    return _possibleConstructorReturn(this, (Ressources.__proto__ || Object.getPrototypeOf(Ressources)).apply(this, arguments));
  }

  _createClass(Ressources, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_RessourcesWidget2.default, this.props);
    }
  }]);

  return Ressources;
}(_react.Component);

;

if (document.getElementById('ressources-widget')) {
  renderWithProps(Ressources, 'ressources-widget');
}

// Ressource Viewer

var Viewer = function (_Component2) {
  _inherits(Viewer, _Component2);

  function Viewer() {
    _classCallCheck(this, Viewer);

    return _possibleConstructorReturn(this, (Viewer.__proto__ || Object.getPrototypeOf(Viewer)).apply(this, arguments));
  }

  _createClass(Viewer, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_ViewerWidget2.default, this.props);
    }
  }]);

  return Viewer;
}(_react.Component);

;
if (document.getElementById('viewer-widget')) {
  renderWithProps(Viewer, 'viewer-widget');
}

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/gaby/Work/freelance/apie/innovmetieretat.github.io/node_modules/react/react.js'");

/***/ }),

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _DocumentThumb = __webpack_require__(209);

var _DocumentThumb2 = _interopRequireDefault(_DocumentThumb);

var _reactStackGrid = __webpack_require__(210);

var _reactStackGrid2 = _interopRequireDefault(_reactStackGrid);

var _github = __webpack_require__(106);

var _github2 = _interopRequireDefault(_github);

var _categories = __webpack_require__(107);

var _categories2 = _interopRequireDefault(_categories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RessourcesWidget = function (_Component) {
  _inherits(RessourcesWidget, _Component);

  function RessourcesWidget(props) {
    _classCallCheck(this, RessourcesWidget);

    var _this = _possibleConstructorReturn(this, (RessourcesWidget.__proto__ || Object.getPrototypeOf(RessourcesWidget)).call(this, props));

    _this.EXTENSIONS_WHITELIST = ['JPG', 'JPEG', 'PNG', 'PDF', 'ODP', 'ODT', 'ODS', 'DOC', 'PPTX', 'XLS'];

    _this.updateDimensions = function () {
      _this.setState({ container_width: $(_this.refs.container).width() });
    };

    _this.componentWillMount = function () {
      // Responsiveness
      _this.updateDimensions();

      // Fetch search bar data if needed
      if (_this.state.fullsearch) {
        // URL Params
        var search = location.search.substring(1);
        if (!_.isEmpty(search)) {
          var params = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
          _this.setState({ search_filter: params.search });
        }
      }

      // Fetch more data from github API
      var docs = _this.state.documents;

      // TODO: Should be batch
      _.each(docs, function (file) {
        _github2.default.client.listCommits({ path: file.path }, function (error, commits) {
          var message = "Pas de description";

          if (!_.isEmpty(commits)) {
            // take the first commit
            var commit = _.last(commits).commit;
            message = commit.message;
          }
          file.description = message;

          _this.setState({ documents: docs });
        });
      });
    };

    _this.componentDidMount = function () {
      _this.updateDimensions();
      window.addEventListener("resize", _this.updateDimensions);
    };

    _this.componentWillUnmount = function () {
      window.removeEventListener("resize", _this.updateDimensions);
    };

    _this.categorySelect = function (e) {
      var el = $(e.target);
      _this.setState({ category: el.data('category') });
    };

    _this.gridToggle = function (e) {
      _this.setState({ list_mode: false });
      setTimeout(function () {
        return _this.grid.updateLayout();
      }, 400); // Because animation makes weird things sometimes
    };

    _this.listToggle = function (e) {
      _this.setState({ list_mode: true });
    };

    _this.filterByName = function (e) {
      var value = _this.refs.search.value;
      value = _.isEmpty(value) ? '' : $.trim(value);
      _this.setState({ search_filter: _.isEmpty(value) ? null : value });

      // Updates url if we are in fullsearch mode and the browser can handle it
      if (_this.state.fullsearch && history.pushState) {
        var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?search=' + value;
        window.history.pushState({ path: newurl }, '', newurl);
      }
    };

    _this.documentsList = function () {
      // Only take files that are in the selected category 
      var for_current_category = _.filter(_this.state.documents, function (document) {
        return _.includes(document.categories, _this.state.category);
      });

      if (_this.state.search_filter) {
        var documents_list = _.filter(for_current_category, function (document) {
          return new RegExp(_this.state.search_filter, "im").test(document.name);
        });
      } else {
        var documents_list = for_current_category;
      }

      // If we need to display only 6 for instance
      if (_this.state.max_displayed) {
        documents_list = _.take(documents_list, _this.state.max_displayed);
      }
      return _.map(documents_list, function (document, key) {
        return _react2.default.createElement(_DocumentThumb2.default, _extends({ key: key }, document));
      });
    };

    _this.state = {
      search_filter: null,
      fullsearch: props.fullsearch == "" ? false : true,
      list_mode: false,
      container_width: 700, // Used for pinterest type display to be responsive
      max_displayed: _.isEmpty(props.max) ? null : parseInt(props.max),
      category: "prod-cnt",
      documents: _this.normalizeData(props.dataSet)
    };
    return _this;
  }

  _createClass(RessourcesWidget, [{
    key: 'normalizeData',
    value: function normalizeData(array) {
      var _this2 = this;

      // Only take files that have the right extension
      var whitelisted = _.filter(array, function (object) {
        return _.includes(_this2.EXTENSIONS_WHITELIST, object.extname.replace(".", "").toUpperCase());
      });

      return _.map(whitelisted, function (object) {
        return {
          name: object.basename,
          description: null,
          primary_category: _categories2.default.PRIMARY[object.path.split("/")[2]],
          categories: ["prod-cnt", _categories2.default.SECONDARY[object.path.split("/")[3]]],
          path: object.path.replace(/^\//, ""), // removes the first /
          extension: object.extname,
          modified_at: object.modified_time
        };
      });
    }

    // Event listener that selects a category


    // Renders a list of document

  }, {
    key: 'isSelectedClass',
    value: function isSelectedClass(category) {
      return this.state.category == category ? 'cat-active ' + category : category;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (this.state.list_mode) {
        var htmlDocumentsList = _react2.default.createElement(
          'div',
          { className: 'imgSwitch documents-thumbnails-container' },
          _react2.default.createElement(
            'div',
            { className: 'row row-list', ref: 'container' },
            this.documentsList()
          ),
          this.state.fullsearch ? '' : _react2.default.createElement(
            'div',
            { className: 'loadit' },
            _react2.default.createElement(
              'a',
              { href: '/search.html', className: 'btn btn-primary' },
              'Afficher tout'
            )
          )
        );
      } else {
        // Grid mode
        var htmlDocumentsList = _react2.default.createElement(
          'div',
          { className: 'imgSwitch documents-thumbnails-container' },
          _react2.default.createElement(
            'div',
            { className: 'row', ref: 'container' },
            _react2.default.createElement(
              _reactStackGrid2.default,
              { columnWidth: (this.state.container_width - 20) / 4, gutterHeight: 5, gridRef: function gridRef(grid) {
                  return _this3.grid = grid;
                } },
              this.documentsList()
            )
          ),
          this.state.fullsearch ? '' : _react2.default.createElement(
            'div',
            { className: 'loadit' },
            _react2.default.createElement(
              'a',
              { href: '/search.html', className: 'btn btn-primary' },
              'Afficher tout'
            )
          )
        );
      }

      return _react2.default.createElement(
        'div',
        { className: 'glView' },
        _react2.default.createElement(
          'div',
          { className: 'switcher' },
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
              'li',
              { id: 'grid', onClick: this.gridToggle, className: 'grid ' + (!this.state.list_mode ? 'grid-active' : '') },
              _react2.default.createElement('i', { className: 'fa fa-th-large' })
            ),
            _react2.default.createElement(
              'li',
              { id: 'list', onClick: this.listToggle, className: 'list ' + (this.state.list_mode ? 'list-active' : '') },
              _react2.default.createElement('i', { className: 'fa fa-align-justify' })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'ressources-search' },
          _react2.default.createElement('input', { type: 'text', ref: 'search', onChange: this.filterByName, onKeyPress: this.filterByName, className: 'search-bar form-control', value: this.state.search_filter || '', placeholder: 'Organiser un barcamp, ...' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'menuSwitch ' + (this.state.fullsearch ? 'hide' : '') },
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
              'li',
              { className: 'all ' + this.isSelectedClass('prod-cnt'),
                onClick: this.categorySelect,
                'data-category': 'prod-cnt' },
              'Toutes'
            ),
            _react2.default.createElement(
              'li',
              { className: _categories2.default.COLORS['creativite'] + '-border ' + _categories2.default.COLORS['creativite'] + '-bg-hover ' + this.isSelectedClass('creativite'),
                onClick: this.categorySelect,
                'data-category': 'creativite' },
              'Cr\xE9ativit\xE9'
            ),
            _react2.default.createElement(
              'li',
              { className: _categories2.default.COLORS['juridique'] + '-border ' + _categories2.default.COLORS['juridique'] + '-bg-hover ' + this.isSelectedClass('juridique'),
                onClick: this.categorySelect,
                'data-category': 'juridique' },
              'Juridique'
            ),
            _react2.default.createElement(
              'li',
              { className: _categories2.default.COLORS['marches'] + '-border ' + _categories2.default.COLORS['marches'] + '-bg-hover ' + this.isSelectedClass('marches'),
                onClick: this.categorySelect,
                'data-category': 'marches' },
              'March\xE9s publics'
            ),
            _react2.default.createElement(
              'li',
              { className: _categories2.default.COLORS['documentation'] + '-border ' + _categories2.default.COLORS['documentation'] + '-bg-hover ' + this.isSelectedClass('documentation'),
                onClick: this.categorySelect,
                'data-category': 'documentation' },
              'Documentation'
            ),
            _react2.default.createElement(
              'li',
              { className: _categories2.default.COLORS['parangonnage'] + '-border ' + _categories2.default.COLORS['parangonnage'] + '-bg-hover ' + this.isSelectedClass('parangonnage'),
                onClick: this.categorySelect,
                'data-category': 'parangonnage' },
              'Parangonnage'
            ),
            _react2.default.createElement(
              'li',
              { className: _categories2.default.COLORS['technologies'] + '-border ' + _categories2.default.COLORS['technologies'] + '-bg-hover ' + this.isSelectedClass('technologies'),
                onClick: this.categorySelect,
                'data-category': 'technologies' },
              'Technologies'
            ),
            _react2.default.createElement(
              'li',
              { className: _categories2.default.COLORS['communication'] + '-border ' + _categories2.default.COLORS['communication'] + '-bg-hover ' + this.isSelectedClass('communication'),
                onClick: this.categorySelect,
                'data-category': 'communication' },
              'Communication'
            ),
            _react2.default.createElement(
              'li',
              { className: _categories2.default.COLORS['lieux'] + '-border ' + _categories2.default.COLORS['lieux'] + '-bg-hover ' + this.isSelectedClass('lieux'),
                onClick: this.categorySelect,
                'data-category': 'lieux' },
              'Lieux et Ev\xE9nements'
            ),
            _react2.default.createElement(
              'li',
              { className: _categories2.default.COLORS['inventions'] + '-border ' + _categories2.default.COLORS['inventions'] + '-bg-hover ' + this.isSelectedClass('inventions'),
                onClick: this.categorySelect,
                'data-category': 'inventions' },
              'Inventions'
            ),
            _react2.default.createElement(
              'li',
              { className: _categories2.default.COLORS['autres'] + '-border ' + _categories2.default.COLORS['autres'] + '-bg-hover ' + this.isSelectedClass('autres'),
                onClick: this.categorySelect,
                'data-category': 'autres' },
              'Autres'
            )
          )
        ),
        htmlDocumentsList
      );
    }
  }]);

  return RessourcesWidget;
}(_react.Component);

;

exports.default = RessourcesWidget;

/***/ }),

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _categories = __webpack_require__(107);

var _categories2 = _interopRequireDefault(_categories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Document thumbnail used in RessourcesWidget
var DocumentThumb = function (_Component) {
  _inherits(DocumentThumb, _Component);

  function DocumentThumb(props) {
    _classCallCheck(this, DocumentThumb);

    return _possibleConstructorReturn(this, (DocumentThumb.__proto__ || Object.getPrototypeOf(DocumentThumb)).call(this, props));
  }

  _createClass(DocumentThumb, [{
    key: 'render',
    value: function render() {
      var category = _.last(this.props.categories);
      var color = _categories2.default.COLORS[category];
      var name = this.props.name.split(/-|_/).join(' ');
      var primary_cat = _categories2.default.PRIMARY_DISPLAY[this.props.primary_category];

      return _react2.default.createElement(
        'div',
        { className: 'document-item col-xs-6 col-sm-3 col-md-3 dbox prod-cnt' },
        _react2.default.createElement(
          'div',
          { className: 'itemCont' },
          _react2.default.createElement(
            'a',
            { href: '/viewer.html?document=' + this.props.path + '&primary_cat=' + this.props.primary_category + '&cat=' + category },
            _react2.default.createElement(
              'div',
              { className: 'thumb-container' },
              _react2.default.createElement(
                'div',
                { className: 'thumb ' + color },
                _react2.default.createElement(
                  'div',
                  { className: 'thumb-upper' },
                  _react2.default.createElement('img', { className: 'img-responsive center-block', src: 'assets/images/pictos/picto-' + this.props.primary_category + '-' + color + '.png' }),
                  _react2.default.createElement(
                    'div',
                    { className: 'thumb-primary' },
                    primary_cat
                  ),
                  _react2.default.createElement('span', { className: 'category-separator' }),
                  _react2.default.createElement(
                    'div',
                    { className: 'document-name ' + color + '-font' },
                    name
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'thumb-lower' },
                  category
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'itemInfo' },
              _react2.default.createElement(
                'h4',
                { className: 'document-name ' + color + '-font' },
                name
              ),
              _react2.default.createElement(
                'h6',
                { className: 'thumb-primary' },
                primary_cat
              ),
              _react2.default.createElement(
                'p',
                { className: 'description' },
                this.props.description || "Pas de description."
              ),
              _react2.default.createElement(
                'button',
                { type: 'button', className: 'btn btn-primary goto' },
                'Consulter'
              )
            )
          )
        )
      );
    }
  }]);

  return DocumentThumb;
}(_react.Component);

;

exports.default = DocumentThumb;

/***/ }),

/***/ 210:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/gaby/Work/freelance/apie/innovmetieretat.github.io/node_modules/react-stack-grid/lib/index.js'");

/***/ }),

/***/ 285:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(12);

var _react2 = _interopRequireDefault(_react);

var _github = __webpack_require__(106);

var _github2 = _interopRequireDefault(_github);

var _categories = __webpack_require__(107);

var _categories2 = _interopRequireDefault(_categories);

var _sweetalert = __webpack_require__(287);

var _sweetalert2 = _interopRequireDefault(_sweetalert);

var _moment = __webpack_require__(288);

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ViewerWidget = function (_Component) {
  _inherits(ViewerWidget, _Component);

  function ViewerWidget(props) {
    var _this$state;

    _classCallCheck(this, ViewerWidget);

    // Extract params from URL
    var _this = _possibleConstructorReturn(this, (ViewerWidget.__proto__ || Object.getPrototypeOf(ViewerWidget)).call(this, props));

    _this.HANDLED_EXTENSIONS = {
      viewerjs: ["PDF", "ODT", "ODS", "ODP", "ODG", " ODC", "ODF", "ODB", "ODI", "ODM", "OTT", "OTS", "OTP", "OTG"],
      microsoft: ["DOCX"],
      images: ["PNG", "JPG", "JPEG", "GIF"]
    };

    _this.updateDimensions = function () {
      var width = $(_this.refs.viewerContainer).width();
      var height = Math.floor(width * 1.414);
      _this.setState({ containerWidth: width, cointainerHeight: height });
    };

    _this.componentDidMount = function () {
      _this.updateDimensions();
      window.addEventListener("resize", _this.updateDimensions);
    };

    _this.componentWillUnmount = function () {
      window.removeEventListener("resize", _this.updateDimensions);
    };

    _this.componentWillMount = function () {
      _this.updateDimensions();

      var file = _this.state.document;
      _github2.default.client.listCommits({ path: file.path }, function (error, commits) {
        var message = "Pas de description";

        if (!_.isEmpty(commits)) {
          // take and remove the first commit
          var data = commits.pop();

          var extractDataFromCommit = function extractDataFromCommit(data, object) {
            var commit = data.commit;
            //console.log(data);
            object.description = commit.message;
            object.modified_at = new Date(commit.author.date);
            object.user = {
              picture: 'https://github.com/' + (data.author ? data.author.login : '') + '.png', // TODO default image
              url: data.author ? data.author.html_url : '',
              name: commit.author ? commit.author.name : "Anonymous",
              email: commit.author ? commit.author.email : ''
            };
            return object;
          };

          // Update the document with data extracted from the first commit
          file = extractDataFromCommit(data, file);

          // Create document history
          file.history = _.map(commits, function (commit) {
            return extractDataFromCommit(commit, {});
          });
        } else {
          file.description = message;
        }

        _this.setState({ documents: file });
      });
    };

    var search = location.search.substring(1);
    if (!_.isEmpty(search)) {
      var params = {};
      // Extract path separetaly, see below
      // Extract the rest in the object
      params = _.assign.apply(_, _.map(search.match(/&(\w+)=(\w+)/g), function (pair) {
        pair = pair.substring(1);
        var keyvalue = pair.split("=");
        var obj = {};
        obj[keyvalue[0]] = keyvalue[1];
        return obj;
      }));

      // Extract path separetaly because it can contain special characters, like & and =
      var _path = search.replace(search.match(/(&\w+=\w+)+$/ig)[0], '').split("=");
      _path.shift();
      _path = _path.join("=");
      params.document = decodeURI(_path);
    } else {
      (0, _sweetalert2.default)({
        title: 'Il y a un problème !',
        text: "Vous essayez de voir un document qui n'existe pas.",
        type: 'error',
        confirmButtonText: 'Revenir à la page précédente'
      }).then(function () {
        return window.history.back();
      });
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
    var handler = _.includes(_this.HANDLED_EXTENSIONS['viewerjs'], _ext) && 'viewerjs' || _.includes(_this.HANDLED_EXTENSIONS['microsoft'], _ext) && 'microsoft' || _.includes(_this.HANDLED_EXTENSIONS['images'], _ext) && 'images' || null;

    _this.state = (_this$state = {
      containerHeight: 1350
    }, _defineProperty(_this$state, 'containerHeight', 960), _defineProperty(_this$state, 'handler', handler), _defineProperty(_this$state, 'document', {
      name: name,
      description: null,
      primary_category: params.primary_cat,
      categories: ["prod-cnt", params.cat],
      path: path,
      extension: extension,
      modified_at: null,
      user: {
        picture: '',
        url: '#',
        name: "Anonymous",
        email: null
      }
    }), _this$state);
    return _this;
  }

  _createClass(ViewerWidget, [{
    key: 'render',
    value: function render() {
      var document = this.state.document;
      var primary_cat = _categories2.default.PRIMARY_DISPLAY[document.primary_category];
      var category = _.last(document.categories);
      var color = _categories2.default.COLORS[category];
      console.log(document);

      var viewer = null;
      if (this.state.handler) {
        if (this.state.handler == "viewerjs") {
          viewer = _react2.default.createElement('iframe', { src: '/js/vendor/ViewerJS/#../../../' + document.path, width: this.state.containerWidth, height: this.state.containerHeight, allowFullScreen: true });
        } else if (this.state.handler == "images") {
          viewer = _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('img', { src: document.path })
          );
        }
      } else {
        viewer = _react2.default.createElement(
          'div',
          null,
          'Ce type de document n\'est pas g\xE9r\xE9 par notre visionneuse.',
          _react2.default.createElement('br', null),
          'Vous pouvez cependant consulter le document en le t\xE9l\xE9chargeant directement.'
        );
      }

      // Make sure it is not null
      document.history = document.history || [];
      // History of commits
      var historyList = _react2.default.createElement(
        'div',
        { className: 'viewer-history' },
        _react2.default.createElement(
          'h3',
          null,
          'Historique'
        ),
        _react2.default.createElement(
          'ul',
          { className: 'list-history' },
          _.map(document.history, function (commit, i) {
            return _react2.default.createElement(
              'li',
              { key: i, className: 'history-item' },
              _react2.default.createElement(
                'div',
                { className: 'history-user' },
                _react2.default.createElement('img', { src: commit.user.picture, width: '50' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'history-description' },
                _react2.default.createElement(
                  'a',
                  { href: commit.user.url },
                  'Par ',
                  commit.user.name,
                  ' le ',
                  (0, _moment2.default)(commit.modified_at).format("DD/MM/YYYY - hh:mm:ss")
                ),
                commit.description
              )
            );
          })
        )
      );

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'apie-header viewer-header ' + color + '-border' },
          _react2.default.createElement('img', { className: 'img-responsive center-block', src: 'assets/images/pictos/picto-' + document.primary_category + '-' + color + '.png' }),
          _react2.default.createElement(
            'div',
            { className: 'viewer-primary page-category' },
            primary_cat,
            _react2.default.createElement('div', { className: 'header-separator' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'viewer-document-name page-title ' + color + '-font' },
            document.name
          ),
          _react2.default.createElement(
            'div',
            { className: 'viewer-category ' + color },
            category
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'viewer-container', ref: 'viewerContainer' },
          viewer
        ),
        _react2.default.createElement(
          'div',
          { className: 'viewer-description' },
          document.description,
          _react2.default.createElement(
            'span',
            { className: 'download-container' },
            _react2.default.createElement(
              'a',
              { className: 'download-link btn ' + color, href: '/' + document.path, download: true },
              'T\xE9l\xE9charger'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'viewer-user' },
          _react2.default.createElement('img', { src: document.user.picture, width: '100' }),
          _react2.default.createElement(
            'div',
            { className: 'user-content' },
            _react2.default.createElement(
              'h4',
              null,
              'Fiche r\xE9alis\xE9e par ',
              document.user.name
            ),
            _react2.default.createElement(
              'p',
              null,
              'Cr\xE9\xE9 le ',
              (0, _moment2.default)(document.modified_at).format("DD/MM/YYYY - hh:mm:ss")
            ),
            _react2.default.createElement(
              'div',
              { className: 'links-container' },
              _react2.default.createElement(
                'a',
                { className: 'user-contact btn btn-primary', href: 'mailto:' + document.user.email },
                'Contacter'
              ),
              _react2.default.createElement(
                'a',
                { className: 'user-link btn btn-primary', href: document.user.url },
                'Voir son profil'
              )
            )
          )
        ),
        document.history.length > 0 ? historyList : ''
      );
    }
  }]);

  return ViewerWidget;
}(_react.Component);

exports.default = ViewerWidget;

/***/ }),

/***/ 287:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/gaby/Work/freelance/apie/innovmetieretat.github.io/node_modules/sweetalert2/dist/sweetalert2.js'");

/***/ }),

/***/ 288:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/gaby/Work/freelance/apie/innovmetieretat.github.io/node_modules/moment/moment.js'");

/***/ }),

/***/ 38:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/Users/gaby/Work/freelance/apie/innovmetieretat.github.io/node_modules/react-dom/index.js'");

/***/ })

/******/ });