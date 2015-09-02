'use strict';

var React = require('react');
var config = require('../config');
var Router = require('react-router');
var State = Router.State;
var moment = require('moment');
var request = require('superagent');
require('superagent-jsonp')(request);

// tumblr api
var tumblrUrl = config.tumblrUrl;
var apiKey = config.apiKey;

var Single = React.createClass({
  // mixin
  mixins: [ State ],

  // 初期化
  getInitialState: function(){
    return {
      data: []
    };
  },

  // Ajax
  loadAjax: function(){
    var params = this.getParams();

    request
      .get(tumblrUrl)
      .query({
        api_key: apiKey,
        id: params.id,
        reblog_info: true,
        notes_info: true,
        format: 'html'
      })
      .jsonp()
      .end(function(err, data){
        if (err) {
          console.error(err.toString());
        }
        this.setState({
          data: data.body.response.posts[0]
        });
        console.log(this.state.data);
      }.bind(this));
  },

  // コンポーネントの準備完了
  componentDidMount: function(){
    this.loadAjax();
  },

  render: function(){
    var article = this.state.data;

    return (
      <div className="article article--single">
        <h1 className="article__title">{article.title}</h1>
        <div className="article__date">
          <small>{moment(new Date(article.date)).format('LL')}</small>
        </div>
        <div className="article__body" dangerouslySetInnerHTML={{__html: article.body}} />
      </div>
    );
  }
});

module.exports = Single;