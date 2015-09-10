'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
  render: function(){
    return (
      <header className='header'>
        <div className="header__bg"></div>

        <h1 className="header__title">
          <Link to={'/'}>Dancing Girl.</Link>
        </h1>

        <div className="header__navi">
          <ul className="header__link">
            <li className="header__linkItem">
              <Link to={'/'}>TOP</Link>
            </li>
            <li className="header__linkItem">
              <Link to={'/about'}>ABOUT</Link>
            </li>
            <li className="header__linkItem">
              <a href="/archive">ARCHIVE</a>
            </li>
          </ul>

          <ul className="header_sns">
            <li className="header__snsItem header__snsItem--twitter">
              <Link to={'/'} target='_blank'>Twitter</Link>
            </li>
            <li className="header__snsItem header__snsItem--pixiv">
              <Link to={'/'} target='_blank'>Pixiv</Link>
            </li>
          </ul>
        </div>
      </header>
    );
  }
});