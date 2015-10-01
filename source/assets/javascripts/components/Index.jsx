'use strict';

var React = require('react');

// components
var PhotoList = require('./PhotoList');
var TextList = require('./TextList');

module.exports = React.createClass({
  componentWillMount: function(){
    this.props.onLoadStart();
  },

  // DOM初期化された時
  componentDidMount: function(){
    this.props.onLoadIndex();
    this.props.onLoadEnd();
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