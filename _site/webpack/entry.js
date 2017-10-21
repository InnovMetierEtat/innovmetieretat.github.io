import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RessourcesWidget from './components/RessourcesWidget.jsx';
import ViewerWidget from './components/ViewerWidget.jsx';

// Extract attributes from the original html element and add them as react props
function renderWithProps(component, id) {
  var node = document.getElementById(id);
  var props = $(node).data() || {};
  // Extract potential data from inside the element
  var data = $(node).find('[data-set=true]').text();

  if (!_.isEmpty(data)) { data = JSON.parse(data); }
  props.dataSet = data;
  console.log(props)

  // Render to dom with props
  return ReactDOM.render(
    React.createElement(component, props, null),
    node
  );
};

// ---------------------------------------------
// ---------- Plug widgets in pages ------------
// ---------------------------------------------

// Ressources
class Ressources extends Component {
  render() {
    return (
        <RessourcesWidget {...this.props} />
    );
  }
};

if (document.getElementById('ressources-widget')) {
  renderWithProps(Ressources, 'ressources-widget');
}

// Ressource Viewer
class Viewer extends Component {
  render() {
    return (
        <ViewerWidget {...this.props} />
    );
  }
};
if (document.getElementById('viewer-widget')) {
  renderWithProps(Viewer, 'viewer-widget');
}
