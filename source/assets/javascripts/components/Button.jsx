'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
  render: function(){
    if( this.props.type === 'more' ){
      return (
        <div className='button'>{this.props.children}</div>
      );
    }
    else {
      return (
        <Link className='button' to={this.props.href}>{this.props.children}</Link>
      );
    }
  }
});