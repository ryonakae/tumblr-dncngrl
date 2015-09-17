'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var DocumentTitle = require('react-document-title');
require('jquery');
require('velocity');

// components
var Header = require('./Header');
var Footer = require('./Footer');
var FixedContent = require('./FixedContent');
var Rectangle = require('./Rectangle');
var canvas = require('../canvas');

module.exports = React.createClass({
  // DOM初期化された時
  componentDidMount: function(){
    console.log('DOMの初期化');

    //canvas描画
    canvas();
  },

  // component更新された時
  componentDidUpdate: function(){
    console.log('Componentの更新');
  },

  render: function(){
    return (
      <DocumentTitle title='Dancing Girl.'>
        <div className='app'>
          <Header />
          <RouteHandler />
          <Footer />
          <FixedContent />
          <Rectangle />
        </div>
      </DocumentTitle>
    );
  }
});