'use strict';

var React = require('react');

// components
var PhotoList = require('./PhotoList');
var TextList = require('./TextList');

module.exports = React.createClass({
  // DOM初期化された時
  componentDidMount: function(){
    this.props.onLoadIndex();
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