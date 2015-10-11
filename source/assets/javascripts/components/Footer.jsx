'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
require('jquery');
require('velocity');

module.exports = React.createClass({
  // scrolltop function
  backTop: function(){
    $('html').velocity('scroll', {
      duration: 1000,
      easing: 'easeOutQuint'
    });
  },

  render: function(){
    // svg
    var svg_logoFooterSymbol = '<use xlink:href="#logo_footer_symbol" />';
    var svg_logoFooterText = '<title>Dancing Girl.</title><use xlink:href="#logo_footer_text" />';
    var svg_logoBrdr = '<title>Border/</title><use xlink:href="#logo_brdr" />';
    var svg_iconTwitter = '<use xlink:href="#icon_twitter" />';
    var svg_iconPixiv = '<use xlink:href="#icon_pixiv" />';
    var svg_border = '<use xlink:href="#border_wave" />';

    return (
      <footer className='footer'>
        <div className="footer__top">
          <Link className="footer__logo" to={'/'}>
            <div className='footer__logoSymbol'>
              <svg dangerouslySetInnerHTML={{__html:svg_logoFooterSymbol}}></svg>
            </div>
            <h3 className='footer__logoText'>
              <svg dangerouslySetInnerHTML={{__html:svg_logoFooterText}}></svg>
            </h3>
          </Link>

          <ul className="footer_sns">
            <li className="footer__snsItem footer__snsItem--twitter">
              <a href='https://twitter.com/ryo_dg' target='_blank'>
                <span>TWITTER</span>
                <svg dangerouslySetInnerHTML={{__html:svg_iconTwitter}}></svg>
              </a>
            </li>
            <li className="footer__snsItem footer__snsItem--pixiv">
              <a href='http://pixiv.me/ryo_dg' target='_blank'>
                <span>PIXIV</span>
                <svg dangerouslySetInnerHTML={{__html:svg_iconPixiv}}></svg>
              </a>
            </li>
          </ul>

          <div className="footer__border">
            <svg dangerouslySetInnerHTML={{__html:svg_border}}></svg>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__poetry">
            <h4 className="footer__poetryTitle">DANCING LIKE THE GIRL.</h4>
            <p className="footer__poetryText">The story is the account of the star-crossed romance between a German dancing girl, Elise, and the protagonist, Toyotarō Ōta a Japanese exchange student who must choose between his career and his feelings for the dancer. The Japanese student eventually chooses his career, sending the dancing girl into a nervous breakdown. He leaves the girl alone and pregnant with his child, ending the story.</p>
          </div>

          <a className="footer__brdrLogo" href='http://brdr.jp' target='_blank'>
            <svg dangerouslySetInnerHTML={{__html:svg_logoBrdr}}></svg>
            <div className="footer__brdrLogoBg"></div>
          </a>

          <div className="footer__copyright">
            &copy; DANCING GIRL.<br />
            DESIGN AND ILLUSTRATION BY <a href='http://brdr.jp' target='_blank'>RYO NAKAE</a>
          </div>

          <div className="footer__backTop" onClick={this.backTop}>SCROLL TO TOP</div>
        </div>
      </footer>
    );
  }
});