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
      data: [],
      page: 1
    };
  },

  // Ajax
  loadAjax: function(){
    request
      .get(this.props.url)
      .query({
        api_key: this.props.apiKey,
        limit: this.props.limit,
        offset: this.state.page * this.props.limit - this.props.limit,
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

    // スクロールイベントを追加
    window.addEventListener('scroll', this.nextPage);
  },

  // レンダリング
  render: function(){
    var articleNodes = this.state.data.map(function(article){
      return (
        <ArticleListItem title={article.title} date={article.date} slug={article.slug} body={article.body} id={article.id} key={article.id} />
      );
    });

    return (
      <div className="entryList" onScroll={this.nextPage}>
        {articleNodes}
      </div>
    );
  }
});