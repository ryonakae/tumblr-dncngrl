'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

// components
var Header = require('./Header');
var Footer = require('./Footer');
var FixedContent = require('./FixedContent');

module.exports = React.createClass({
  render: function(){
    return (
      <div className='app'>
        <Header />
        <RouteHandler />
        <Footer />
        <FixedContent />
      </div>
    );
  }
});