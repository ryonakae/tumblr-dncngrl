'use strict';

var React = require('react');
var config = require('../config');
var request = require('superagent');
require('superagent-jsonp')(request);
require('jquery');

// tumblr api
var tumblrUrl = config.tumblrUrl;
var apiKey = config.apiKey;
var limit = 5;

// components
var ArticleListItem = require('./ArticleListItem');

module.exports = React.createClass({
  // 初期化
  getInitialState: function(){
    return {
      data: [],
      page: 1
    };
  },

  // Ajax
  loadAjax: function(){
    request
      .get(tumblrUrl)
      .query({
        api_key: apiKey,
        limit: limit,
        offset: this.state.page * limit - limit,
        reblog_info: false,
        notes_info: false,
        format: 'html'
      })
      .jsonp()
      .end(function(err, data){
        // エラー処理
        if (err) {
          console.error(err.toString());
        }

        // データに新しく取得したデータを連結する
        // 初回はoldDataは空
        var oldData = this.state.data;
        var newData = oldData.concat(data.body.response.posts);

        // dataに取得したデータを入れる
        this.setState({
          data: newData
        });

        console.log(data.body.response);
      }.bind(this));
  },

  // 無限スクロール用関数
  nextPage: function(e){
    var documentHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();

    if (documentHeight - scrollPosition === 0) {
      // ページ番号をアップデート
      this.setState({
        page: this.state.page + 1
      });

      // 次ページのデータを取得
      this.loadAjax();
    }
  },

  // コンポーネントの準備完了
  componentDidMount: function(){
    // 1ページ目のデータを取得
    this.loadAjax();

    // windowにイベントを追加
    window.addEventListener('scroll', this.nextPage);
    window.addEventListener('resize', this.nextPage);
  },

  // レンダリング
  render: function(){
    // ArticleListItemコンポーネントを配列分作成し、
    // データを子コンポーネント(ArticleListItem)に渡す
    var articleNodes = this.state.data.map(function(article){
      // 投稿タイプがtextのとき
      if (article.type === 'text') {
        return (
          <ArticleListItem
            title={article.title}
            date={article.date}
            slug={article.slug}
            body={article.body}
            id={article.id}
            key={article.id}
            type={article.type}
            noteCount={article.note_count}
          />
        );
      }

      // 投稿タイプがphotoのとき
      else if (article.type === 'photo') {
        return (
          <ArticleListItem
            title={article.title}
            date={article.date}
            slug={article.slug}
            body={article.body}
            id={article.id}
            key={article.id}
            type={article.type}
            noteCount={article.note_count}
            photos={article.photos}
          />
        );
      }
    });

    return (
      <div className="articleList" onScroll={this.nextPage} onResize={this.nextPage}>
        {articleNodes}
      </div>
    );
  }
});