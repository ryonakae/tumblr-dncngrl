'use strict';

var React = require('react');

// components
var PhotoList = require('./PhotoList');
var TextList = require('./TextList');

module.exports = React.createClass({
  // DOM初期化された時
  componentDidMount: function(){
    console.log('indexが読み込まれた');

    $('.rectangle').velocity(
      {
        width: '50%',
        height: '600px'
      },
      {
        duration: 800,
        easing: 'easeInOutQuart'
      }
    );
  },

  componentWillUnmount: function(){
    console.log('indexがunmountされた');
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