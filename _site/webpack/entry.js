import React, { Component } from 'react';
import {render} from 'react-dom';
import RessourcesWidget from './components/RessourcesWidget.jsx';

class Ressources extends Component {
  render() {
    return (
        <RessourcesWidget />
    );
  }
};

render(<RessourcesWidget />, document.getElementById('ressources-widget'));
