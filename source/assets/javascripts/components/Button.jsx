'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
require('jquery');
require('velocity');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      button: null
    };
  },

  componentDidMount: function(){
    this.state.button = React.findDOMNode(this.refs.button);

    $(this.state.button).velocity({
      backgroundColor: '#76faff',
      backgroundColorAlpha: 0,
      color: '#76faff'
    }, {
      duration: 0
    });
  },

  // マウスオーバー
  mouseOver: function(){
    $(this.state.button).velocity({
      backgroundColor: '#76faff',
      backgroundColorAlpha: 1,
      color: '#fff',
      'border-radius': '30px'
    }, {
      duration: 500,
      easing: 'easeOutCubic'
    });
  },

  // マウスアウト
  mouseOut: function(){
    $(this.state.button).velocity('stop').velocity({
      backgroundColor: '#76faff',
      backgroundColorAlpha: 0,
      color: '#76faff',
      'border-radius': 0
    }, {
      duration: 350,
      easing: 'easeOutCubic'
    });
  },

  render: function(){
    if( this.props.type === 'more' ){
      return (
        <div className='button' onMouseEnter={this.mouseOver} onMouseLeave={this.mouseOut} ref='button' onClick={this.props.onClick}>{this.props.children}</div>
      );
    }
    else {
      return (
        <Link className='button' onMouseEnter={this.mouseOver} onMouseLeave={this.mouseOut} ref='button' to={this.props.href}>{this.props.children}</Link>
      );
    }
  }
});