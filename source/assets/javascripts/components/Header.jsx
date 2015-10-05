'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
  componentDidMount: function(){
  },

  menuClose: function(){
    if (this.props.menuOpen === true) {
      this.props.onMenuClose();
    }
  },

  render: function(){
    // svg
    var svg_logo = '<title>Dancing Girl.</title><use xlink:href="#logo" />';
    var svg_logoInverse = '<use xlink:href="#logo_inverse" />';
    var svg_iconTwitter = '<title>Twitter</title><use xlink:href="#icon_twitter" />';
    var svg_iconPixiv = '<title>Pixiv</title><use xlink:href="#icon_pixiv" />';

    return (
      <header className='header'>
        <div className="header__bg"></div>

        <h1 className="header__title" onClick={this.menuClose}>
          <Link className='header__titleLink' to={'/'}>
            <svg dangerouslySetInnerHTML={{__html:svg_logo}}></svg>
          </Link>
          <div className="header__titleLoader">
            <svg dangerouslySetInnerHTML={{__html:svg_logoInverse}}></svg>
            <div className="header__titleLoaderBg"></div>
          </div>
        </h1>

        <div className="header__navi">
          <div className="header__naviInner">
            <ul ref='link' className="header__link" onClick={this.menuClose}>
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

            <ul className="header_sns" onClick={this.menuClose}>
              <li className="header__snsItem header__snsItem--twitter">
                <a href='https://twitter.com/ryo_dg' target='_blank'>
                  <svg dangerouslySetInnerHTML={{__html:svg_iconTwitter}}></svg>
                </a>
              </li>
              <li className="header__snsItem header__snsItem--pixiv">
                <a href='http://pixiv.me/ryo_dg' target='_blank'>
                  <svg dangerouslySetInnerHTML={{__html:svg_iconPixiv}}></svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="header__toggle" onClick={this.props.onMenuToggle}>{this.props.menuLabel}</div>
      </header>
    );
  }
});