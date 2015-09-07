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
      easing: 'easeOutExpo'
    });
  },

  render: function(){
    return (
      <footer className='footer'>
        <div className="footer__logo">
          <Link to={'/'}>Dancing Girl.</Link>
        </div>

        <ul className="footer_sns">
          <li className="footer_snsItem footer_snsItem--twitter">
            <Link to={'/'} target='_blank'>Twitter</Link>
          </li>
          <li className="footer_snsItem footer_snsItem--pixiv">
            <Link to={'/'} target='_blank'>Pixiv</Link>
          </li>
        </ul>

        <div className="footer__backTop js-backTop" onClick={this.backTop} />

        <small className="footer__copyright">
          &copy; Dancing Girl.<br />
          DESIGN AND ILLUSTRATION BY <a href='http://brdr.jp' target='_blank'>RYO NAKAE</a>
        </small>
      </footer>
    );
  }
});