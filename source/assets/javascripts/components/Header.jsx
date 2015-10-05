'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
require('jquery');
require('velocity');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      menuOpen: false,
      menuLabel: 'MENU',
      navi: null,
      link: null,
      sns: null
    };
  },

  componentDidMount: function(){
    this.setState({
      navi: React.findDOMNode(this.refs.navi),
      link: React.findDOMNode(this.refs.link),
      sns: React.findDOMNode(this.refs.sns)
    });
  },

  menuToggle: function(e){
    var navi = this.state.navi;
    var link = this.state.link;
    var sns = this.state.sns;

    // 閉じてる時→開く
    if (this.state.menuOpen === false) {
      this.setState({
        menuOpen: true,
        menuLabel: 'CLOSE'
      });

      $('body').css({
        'overflow': 'hidden'
      });

      $(navi).css({
        'display': 'block',
        'visibility': 'visible'
      }).velocity({
        opacity: 1
      }, {
        duration: 500,
        delay: 0,
        easing: 'ease'
      });

      $(link).velocity({
        opacity: 1,
        top: 0
      }, {
        duration: 400,
        delay: 350,
        easing: 'easeOutCubic'
      });
      $(sns).velocity({
        opacity: 1,
        top: 0
      }, {
        duration: 400,
        delay: 400,
        easing: 'easeOutCubic'
      });
    }

    // 開いてる時→閉じる
    if (this.state.menuOpen === true) {
      this.setState({
        menuOpen: false,
        menuLabel: 'MENU'
      });

      $('body').css({
        'overflow': 'auto',
        'overflow-x': 'hidden'
      });

      $(this.state.sns).velocity('stop').velocity('reverse', {
        duration: 200,
        delay: 0
      });
      $(this.state.link).velocity('stop').velocity('reverse', {
        duration: 200,
        delay: 50
      });
      $(navi).velocity('stop').velocity('reverse', {
        duration: 400,
        delay: 0,
        complete: function(){
          $(navi).css({
            'display': 'none',
            'visibility': 'hidden'
          });
        }
      });
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

        <h1 className="header__title">
          <Link className='header__titleLink' to={'/'}>
            <svg dangerouslySetInnerHTML={{__html:svg_logo}}></svg>
          </Link>
          <div className="header__titleLoader">
            <svg dangerouslySetInnerHTML={{__html:svg_logoInverse}}></svg>
            <div className="header__titleLoaderBg"></div>
          </div>
        </h1>

        <div ref='navi' className="header__navi">
          <div className="header__naviInner">
            <ul ref='link' className="header__link">
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

            <ul ref='sns' className="header_sns">
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

        <div ref='toggle' className="header__toggle" onClick={this.menuToggle}>{this.state.menuLabel}</div>
      </header>
    );
  }
});