import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/home/Home';
import dotenv from 'dotenv'
dotenv.config()

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);
