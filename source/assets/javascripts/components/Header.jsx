'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
  render: function(){
    // svg
    var svg_logo = '<title>Dancing Girl.</title><use xlink:href="#logo" />';
    var svg_iconTwitter = '<title>Twitter</title><use xlink:href="#icon_twitter" />';
    var svg_iconPixiv = '<title>Pixiv</title><use xlink:href="#icon_pixiv" />';

    return (
      <header className='header'>
        <div className="header__bg"></div>

        <h1 className="header__title">
          <Link to={'/'}>
            <svg dangerouslySetInnerHTML={{__html:svg_logo}}></svg>
          </Link>
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
              <Link to={'/'} target='_blank'>
                <svg dangerouslySetInnerHTML={{__html:svg_iconTwitter}}></svg>
              </Link>
            </li>
            <li className="header__snsItem header__snsItem--pixiv">
              <Link to={'/'} target='_blank'>
                <svg dangerouslySetInnerHTML={{__html:svg_iconPixiv}}></svg>
              </Link>
            </li>
          </ul>
        </div>
      </header>
    );
  }
});