'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function(){
    return (
      <div className={`rectangle rectangle--${this.props.page}`}></div>
    );
  }
});