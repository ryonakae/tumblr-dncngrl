'use strict';

var React = require('react');
var config = require('../config');
var request = require('superagent');
require('superagent-jsonp')(request);
require('jquery');

// tumblr api
var tumblrUrl = config.tumblrUrl;
var apiKey = config.apiKey;
var limit = 3;

// components
var TextListItem = require('./TextListItem');
var Button = require('./Button');

module.exports = React.createClass({
  // 初期化
  getInitialState: function(){
    return {
      data: [],
      page: 1,
      articleCount: limit,
      articleTotal: 0,
      buttonLabel: 'MORE'
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
        format: 'html',
        type: 'text'
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
          data: newData,
          buttonLabel: 'MORE'
        });

        // 最後まで表示したらMOREボタン隠す
        this.chackLastPage();
      }.bind(this));
  },

  // ページ番号確認用関数
  chackLastPage: function(){
    if ( this.state.articleCount >= this.state.articleTotal ) {
      var more = React.findDOMNode(this.refs.more);
      $(more).css({ 'display':'none' });
    }
  },

  // 次ページ読み込み用関数
  nextPage: function(e){
    // ページ番号をアップデート
    this.setState({
      page: this.state.page + 1,
      buttonLabel: 'LOADING'
    });

    // 次ページのデータを取得
    this.loadAjax();
  },

  // コンポーネントの準備完了
  componentDidMount: function(){
    // 1ページ目のデータを取得
    this.loadAjax();

    // 1ページ目が読み込まれたらページ番号を更新しておく
    // スクロールによる読み込みでなく、ボタンクリックでの次ページ呼び出しの場合、
    // こうしないと同じページが呼ばれてしまう
    this.setState({
      page: this.state.page + 1
    });
  },

  // レンダリング
  render: function(){
    // TextListItemコンポーネントを配列分作成し、データを渡す
    var articleNodes = this.state.data.map(function(article){
      return (
        <TextListItem
          title={article.title}
          timestamp={article.timestamp}
          slug={article.slug}
          tags={article.tags}
          body={article.body}
          id={article.id}
          key={article.id}
          type={article.type}
          noteCount={article.note_count}
        />
      );
    });

    return (
      <div className="textList" onResize={this.nextPage}>
        <div className="textList__items">
          {articleNodes}
        </div>

        <div className="textList__more" ref='more'>
          <Button type='more' onClick={this.nextPage}>{this.state.buttonLabel}</Button>
        </div>
      </div>
    );
  }
});