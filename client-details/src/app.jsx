import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import EditionHeader from './components/header.jsx';

class DetailApp extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/books/:id" component={EditionHeader} />
        </Router>
      </div>
    );
  }
}

export default DetailApp;

