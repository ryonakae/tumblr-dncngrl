'use strict';

var React = require('react');
var config = require('../config');
var Router = require('react-router');
var State = Router.State;
var Link = Router.Link;
var DocumentTitle = require('react-document-title');
var moment = require('moment');
var request = require('superagent');
var ReactScriptLoaderMixin = require('react-script-loader').ReactScriptLoaderMixin;
require('superagent-jsonp')(request);
require('jquery');
require('velocity');

// tumblr api
var tumblrUrl = config.tumblrUrl;
var apiKey = config.apiKey;

// components
var Button = require('./Button');

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
      scriptLoading: true,
      scriptLoadError: false
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

  // component更新された時
  componentDidUpdate: function(){
    // velocity
    $('.rectangle').velocity({
      width: '100%',
      height: '650px'
    }, {
      duration: 600,
      easing: 'easeInOutQuart'
    });

    var body = React.findDOMNode(this.refs.body);
    if( $(body).find('.twitter-tweet')[0] ){
      twttr.widgets.load(body);
    }
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
      }.bind(this));
  },

  // コンポーネントの準備完了
  componentDidMount: function(){
    this.loadAjax();
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
            <article className='article'>
              <header className="article__header">
                <h1 className="article__title">{article.title}</h1>
                <div className="article__info">
                  <span className="article__date">{moment(new Date(article.date)).format('YYYY.M.D')}</span>
                  <ul className="article__tag">{articleTags}</ul>
                </div>
                <div className="article__notes">{article.note_count} NOTES</div>
              </header>

              <div className="article__body" dangerouslySetInnerHTML={{__html: article.body}} ref='body' />

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
      return (
        <DocumentTitle title={`${moment(new Date(article.date)).format('YYYY.M.D')} | Dancing Girl.`}>
          <main className="content content--single" ref='content'>
            <article className='article'>
              <header className="article__header">
                <h1 className="article__title">{moment(new Date(article.date)).format('YYYY.M.D')}</h1>
                <div className="article__info">
                  <ul className="article__tag">{articleTags}</ul>
                </div>
                <div className="article__notes">{article.note_count} NOTES</div>
              </header>

              <div className="article__body">
                <div className="article__photo">
                  <img src={article.photos[0].original_size.url} alt="" />
                </div>
                <div className="article__caption" dangerouslySetInnerHTML={{__html: article.caption}} />
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