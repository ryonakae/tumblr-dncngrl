'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({
  render: function(){
    return (
      <header className='header'>
        <h1 className="header__title">
          <Link to={'/'}>Dancing Girl.</Link>
        </h1>
      </header>
    );
  }
});

module.exports = Header;