'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
require('jquery');
require('velocity');

// components
var Header = require('./Header');
var Footer = require('./Footer');
var FixedContent = require('./FixedContent');
var Rectangle = require('./Rectangle');
var canvas = require('../canvas');

module.exports = React.createClass({
  fadeIn: function(){
    $('.content').velocity({
      opacity: 1,
      top: 0
    }, {
      duration: 800,
      delay: 250,
      easing: 'easeInOutCubic'
    });
  },

  // DOM初期化された時
  componentDidMount: function(){
    console.log('DOMの初期化');

    //canvas描画
    canvas();

    this.fadeIn();
  },

  // component更新された時
  componentDidUpdate: function(){
    console.log('Componentの更新');

    this.fadeIn();
  },

  render: function(){
    return (
      <div className='app'>
        <Header />
        <RouteHandler />
        <Footer />
        <FixedContent />
        <Rectangle />
      </div>
    );
  }
});