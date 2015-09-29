'use strict';

var React = require('react');

// components
var PhotoList = require('./PhotoList');
var TextList = require('./TextList');
require('jquery');
require('velocity');

module.exports = React.createClass({
  // DOM初期化された時
  componentDidMount: function(){
    // velocity
    $('.rectangle').velocity(
      {
        width: '50%',
        height: '600px'
      },
      {
        duration: 600,
        easing: 'easeInOutQuart'
      }
    );
  },

  render: function(){
    return (
      <main className="content content--index">
        <PhotoList />
        <TextList />
      </main>
    );
  }
});