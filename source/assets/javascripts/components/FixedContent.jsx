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
      <div className="fixedContent">
        <div className="fixedContent__copyright">
          <div>
            &copy; DANCING GIRL.<br />
            DESIGN AND ILLUSTRATION BY <a href='http://brdr.jp' target='_blank'>RYO NAKAE</a>
          </div>
        </div>

        <div className="fixedContent__backTop">
          <div>
            <span onClick={this.backTop}>BACK TO TOP</span>
          </div>
        </div>
      </div>
    );
  }
});