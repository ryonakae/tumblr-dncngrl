'use strict';

var React = require('react');
var request = require('superagent');
require('superagent-jsonp')(request);

// components
var ArticleListItem = require('./ArticleListItem');

module.exports = React.createClass({
  // 初期化
  getInitialState: function(){
    return {
      data: []
    };
  },

  // Ajax
  loadAjax: function(){
    request
      .get(this.props.url)
      .query({
        api_key: this.props.apiKey,
        limit: this.props.limit,
        reblog_info: false,
        notes_info: false,
        format: 'html'
      })
      .jsonp()
      .end(function(err, data){
        if (err) {
          console.error(err.toString());
        }
        this.setState({
          data: data.body.response.posts
        });
        console.log(data.body.response);
      }.bind(this));
  },

  // コンポーネントの準備完了
  componentDidMount: function(){
    this.loadAjax();
  },

  // レンダリング
  render: function(){
    var articleNodes = this.state.data.map(function(article){
      return (
        <ArticleListItem title={article.title} date={article.date} slug={article.slug} body={article.body} id={article.id} key={article.id} />
      );
    });

    return (
      <div className="entryList">
        {articleNodes}
      </div>
    );
  }
});