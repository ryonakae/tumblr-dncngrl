'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
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
      </footer>
    );
  }
});