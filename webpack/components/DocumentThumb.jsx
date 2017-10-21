import React, { Component } from 'react';
import CategoriesConfig from "../config/categories.js";

// Document thumbnail used in RessourcesWidget
class DocumentThumb extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    var category = _.last(this.props.categories);
    var color = CategoriesConfig.COLORS[category];
    var name = this.props.name.split(/-|_/).join(' ');
    var primary_cat = CategoriesConfig.PRIMARY_DISPLAY[this.props.primary_category];

    return (
      <div className="document-item col-xs-6 col-sm-3 col-md-3 dbox prod-cnt">
        <div className="itemCont">
          <a href={`/viewer.html?document=${this.props.path}&primary_cat=${this.props.primary_category}&cat=${category}`}>
            <div className="thumb-container">
              <div className={`thumb ${color}`}>
                <div className="thumb-upper">
                  <img className="img-responsive center-block" src={`assets/images/pictos/picto-${this.props.primary_category}-${color}.png`} />
                  <div className="thumb-primary">
                    {primary_cat}
                  </div>
                  <span className="category-separator"></span>
                  <div className={`document-name ${color}-font`}>
                    {name}
                  </div>
                </div>
                <div className="thumb-lower">
                  {category}
                </div>
              </div>
            </div>
            <div className="itemInfo">
              <h4 className={`document-name ${color}-font`}>{name}</h4>
              <h6 className="thumb-primary">{primary_cat}</h6>
              <p className="description">{this.props.description || "Pas de description."}</p>
              <button type="button" className="btn btn-primary goto">Consulter</button>
            </div>
          </a>
        </div>
      </div>
    );
  }
};

export default DocumentThumb;
