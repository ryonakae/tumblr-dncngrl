'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
  render: function(){
    // svg
    var svg_logoBrdr = '<use xlink:href="#logo_brdr" />'

    return (
      <footer className='footer'>
        <div className="footer__top">
          <Link className="footer__logo" to={'/'}>
            <h3 className='footer__logoTitle'>Dancing Girl.</h3>
          </Link>

          <ul className="footer_sns">
            <li className="footer__snsItem footer__snsItem--twitter">
              <Link to={'/'} target='_blank'>TWITTER</Link>
            </li>
            <li className="footer__snsItem footer__snsItem--pixiv">
              <Link to={'/'} target='_blank'>PIXIV</Link>
            </li>
          </ul>
        </div>

        <div className="footer__bottom">
          <div className="footer__poetry">
            <h4 className="footer__poetryTitle">DANCING LIKE THE GIRL.</h4>
            <p className="footer__poetryText">The story is the account of the star-crossed romance between a German dancing girl, Elise, and the protagonist, Toyotarō Ōta a Japanese exchange student who must choose between his career and his feelings for the dancer. The Japanese student eventually chooses his career, sending the dancing girl into a nervous breakdown. He leaves the girl alone and pregnant with his child, ending the story.</p>
          </div>

          <Link className="footer__brdrLogo" to={'/'} target='_blank'>
            <svg dangerouslySetInnerHTML={{__html:svg_logoBrdr}}></svg>
          </Link>
        </div>
      </footer>
    );
  }
});