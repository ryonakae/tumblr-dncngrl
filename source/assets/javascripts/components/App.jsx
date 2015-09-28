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
// var canvas = require('../canvas');
var Canvas = require('./Canvas');

module.exports = React.createClass({
  footerFadeIn: function(){
    $('.footer').css({'opacity': 0});
    $('.footer').velocity({
      opacity: 1
    },{
        duration: 800,
        delay: 400,
        easing: 'easeInOutQuart'
    });
  },

  // DOM初期化された時
  componentDidMount: function(){
    console.log('DOMの初期化');

    // canvas描画
    // 引数にReactのcanvas要素を入れる(DOMに変換してから)
    var canvasElement = React.findDOMNode(this.refs.canvas);
    Canvas(canvasElement);

    // フッターフェードイン
    this.footerFadeIn();
  },

  // component更新された時
  componentDidUpdate: function(){
    console.log('Componentの更新');

    // フッターフェードイン
    this.footerFadeIn();
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
          <div id="canvas" ref="canvas" />
        </div>
      </DocumentTitle>
    );
  }
});