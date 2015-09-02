'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({
  render: function(){
    return (
      <header className='header'>
        <div className="header__inner">
          <h1 className="header__title">
            <Link className="header__titleLink" to={'/'}>Dancing Girl.</Link>
          </h1>

          <ul className="header_sns">
            <li className="header__snsItem">
              <Link className='header__snsItemLink header__snsItemLink--twitter' to={'/'} target='_blank'>Twitter</Link>
            </li>
            <li className="header__snsItem">
              <Link className='header__snsItemLink header__snsItemLink--pixiv' to={'/'} target='_blank'>Pixiv</Link>
            </li>
          </ul>

          <ul className="header__navi">
            <li className="header__naviItem">
              <Link to={'/'}>TOP</Link>
            </li>
            <li className="header__naviItem">
              <Link to={'/about'}>ABOUT</Link>
            </li>
            <li className="header__naviItem">
              <Link to={'/archive'}>ARCHIVE</Link>
            </li>
          </ul>
        </div>
      </header>
    );
  }
});

module.exports = Header;