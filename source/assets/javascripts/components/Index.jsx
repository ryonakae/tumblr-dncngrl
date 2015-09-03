'use strict';

var React = require('react');

// components
var ArticleList = require('./ArticleList');

module.exports = React.createClass({
  render: function(){
    return (
      <div className="article article--index">
        <ArticleList />
      </div>
    );
  }
});