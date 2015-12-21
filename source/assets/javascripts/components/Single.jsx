'use strict';

var React = require('react');
var config = require('../config');
var Router = require('react-router');
var State = Router.State;
var Link = Router.Link;
var DocumentTitle = require('react-document-title');
var moment = require('moment');
var ReactScriptLoaderMixin = require('react-script-loader').ReactScriptLoaderMixin;
require('jquery');
require('velocity');

// tumblr api
var tumblrUrl = config.tumblrUrl;
var apiKey = config.apiKey;

// components
var Button = require('./Button');
var SinglePhoto = require('./SinglePhoto');

module.exports = React.createClass({
  // mixin
  mixins: [
    State,
    ReactScriptLoaderMixin
  ],

  // 初期化
  getInitialState: function(){
    return {
      data: [],
      dataLoaded: false,
      scriptLoading: true,
      scriptLoadError: false,
      articlePhotos: []
    };
  },

  // 外部スクリプトを読み込む
  // Twitterの埋め込みツイート用JS
  getScriptURL: function(){
    return 'http://platform.twitter.com/widgets.js'
  },
  onScriptLoaded: function(){
    this.setState({
      scriptLoading: true
    });
  },
  onScriptError: function(){
    this.setState({
      scriptLoading: false,
      scriptLoadError: true
    });
  },

  // Backボタンが見えちゃうのでロード時は隠す
  backHide: function(){
    $('.article__back').css({
      'opacity': 0
    });
  },
  backShow: function(){
    $('.article__back').velocity({
      opacity: 1
    }, {
      duration: 450,
      delay: 400,
      easing: 'ease'
    });
  },

  componentWillMount: function(){
    this.loadAjax();
    this.props.onLoadStart();
    this.backHide();
  },

  // コンポーネントの準備完了
  componentDidMount: function(){
    this.props.onBeforeLoad();
  },

  // component更新された時
  componentDidUpdate: function(){
    if (this.state.dataLoaded === true) {
      this.props.onLoadSingle();
      this.props.onLoadEnd();
      this.backShow();
    }

    // Twitterの埋め込みツイートがあったら関数実行
    var body = React.findDOMNode(this.refs.body);
    if( $(body).find('.twitter-tweet')[0] ){
      twttr.widgets.load(body);
    }
  },

  componentWillUnmount: function(){
    this.setState({
      dataLoaded: false
    });
  },

  // Ajax
  loadAjax: function(){
    var self = this;

    // react-routerのmixin
    // アクティブなparamsの情報を取得
    var params = self.getParams();

    $.ajax({
      type: 'GET',
      url: tumblrUrl,
      data: {
        api_key: apiKey,
        id: params.id,
        reblog_info: true,
        notes_info: true,
        format: 'html'
      },
      cache: false,
      dataType: 'jsonp',
      timeout: 10000,
      success: function(data){
        self.setState({
          data: data.response.posts[0],
          articlePhotos: data.response.posts[0].photos,
          dataLoaded: true
        });
      },
      error: function(){
        alert('Load Error');
      }
    });
  },

  render: function(){
    var article = this.state.data;

    // tags
    // article.tags.lengthがundefinedになるので
    // 空の配列オブジェクトを作り、article.tagsを合体する
    // そして新しく作った配列のlengthを取る（つらい）
    var tags = [];
    tags = tags.concat(article.tags);
    var articleTags = [];
    for (var i = 0; i < tags.length; i++) {
      articleTags.push(<li>{tags[i]}</li>);
    }


    // textのとき
    if ( article.type === 'text' ) {
      return (
        <DocumentTitle title={`${article.title} | Dancing Girl.`}>
          <main className="content content--single">
            <article className='article article--text'>
              <header className="article__header">
                <h1 className="article__title">{article.title}</h1>
                <div className="article__info">
                  <span className="article__date">{moment.unix(new Date(article.timestamp)).format('YYYY.M.D')}</span>
                  <ul className="article__tag">{articleTags}</ul>
                </div>
                <div className="article__notes">{article.note_count} NOTES</div>
              </header>

              <div className="article__body" dangerouslySetInnerHTML={{__html: article.body}} ref='body' />
              <div className="article__reblog">
                <a href={`https://www.tumblr.com/reblog/${article.id}/${article.reblog_key}`} target="_blank">REBLOG THIS ARTICLE</a>
              </div>

              <div className="article__back">
                <Button type='link' href='/'>BACK</Button>
              </div>
            </article>
          </main>
        </DocumentTitle>
      );
    }


    // photoのとき
    else if ( article.type === 'photo' ) {
      // photos
      // SinglePhotoコンポーネントを配列分作成し、子コンポーネントにデータを渡す
      var articlePhotos = this.state.articlePhotos.map(function(photo){
        return (
          <SinglePhoto src={photo.original_size.url} />
        );
      });

      return (
        <DocumentTitle title={`${moment.unix(new Date(article.timestamp)).format('YYYY.M.D')} | Dancing Girl.`}>
          <main className="content content--single" ref='content'>
            <article className='article'>
              <header className="article__header">
                <h1 className="article__title">{moment.unix(new Date(article.timestamp)).format('YYYY.M.D')}</h1>
                <div className="article__info">
                  <ul className="article__tag">{articleTags}</ul>
                </div>
                <div className="article__notes">{article.note_count} NOTES</div>
              </header>

              <div className="article__body">
                <div className="article__photo">{articlePhotos}</div>
                <div className="article__caption" dangerouslySetInnerHTML={{__html: article.caption}} />
              </div>
              <div className="article__reblog">
                <a href={`https://www.tumblr.com/reblog/${article.id}/${article.reblog_key}`} target="_blank">REBLOG THIS ARTICLE</a>
              </div>

              <div className="article__back">
                <Button type='link' href='/'>BACK</Button>
              </div>
            </article>
          </main>
        </DocumentTitle>
      );
    }


    // それ以外のとき
    else { //elseがないとエラー出る
      return (
        <main className="content content--single" ref='content'>
          <article className='article'>
            <div className="article__back">
              <Button type='link' href='/'>BACK</Button>
            </div>
          </article>
        </main>
      );
    }
  }
});