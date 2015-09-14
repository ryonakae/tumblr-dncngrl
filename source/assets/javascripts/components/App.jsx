'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

// components
var Header = require('./Header');
var Footer = require('./Footer');
var FixedContent = require('./FixedContent');
var Rectangle = require('./Rectangle');
var canvas = require('../canvas');

module.exports = React.createClass({
  componentDidMount: function(){
    console.log('DOMの初期化');
    canvas;
  },
  componentDidUpdate: function(){
    console.log('Componentの更新');
  },
  render: function(){
    return (
      <div className='app'>
        <Header />
        <RouteHandler />
        <Footer />
        <FixedContent />
        <Rectangle page={this.state.page} />
      </div>
    );
  }
});