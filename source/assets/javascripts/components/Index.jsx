'use strict';

var React = require('react');
var config = require('../config');

// components
var ArticleList = require('./ArticleList');

// tumblr api
var tumblrUrl = config.tumblrUrl;
var apiKey = config.apiKey;
var limit = 5;

module.exports = React.createClass({
  render: function(){
    return (
      <div className="article article--index">
        <ArticleList url={tumblrUrl} apiKey={apiKey} limit={limit} />
      </div>
    );
  }
});