'use strict';

var React = require('react');
require('jquery');
require('velocity');

var Triangle = require('./Triangle')

var Canvas = React.createClass({
  // DOM初期化された時
  componentDidMount: function(){
    // canvas描画
    // 引数にReactのcanvas要素を入れる(DOMに変換してから)
    var canvasElement = React.findDOMNode(this.refs.triangle);
    Triangle(canvasElement);

    $('#canvas').velocity({
      opacity: 1
    }, {
      duration: 800,
      delay: 600,
      easing: 'easeInOutCubic'
    });
  },

  render: function(){
    return(
      <div id="canvas" ref="triangle" />
    );
  }
});

module.exports = Canvas;