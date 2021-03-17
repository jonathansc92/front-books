import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './components/Menu';
import Search from './components/Search';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Menu />
    <Search />
  </React.StrictMode>,
  document.getElementById('root')
);