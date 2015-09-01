'use strict';

var React = require('react');

var Footer = React.createClass({
  render: function(){
    return (
      <footer className='footer'>
        <small className="footer__copyright">&copy; Dancing Girl.</small>
      </footer>
    );
  }
});

module.exports = Footer;