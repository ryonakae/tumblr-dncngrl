'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function(){
    return (
      <img className="test" src={this.props.src} />
    );
  }
});