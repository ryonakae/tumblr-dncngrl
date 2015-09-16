'use strict';

var React = require('react');
var config = require('../config');
var Router = require('react-router');
var State = Router.State;
var Link = Router.Link;
var moment = require('moment');
var request = require('superagent');
var canvas = require('../canvas');
require('superagent-jsonp')(request);
require('jquery');
require('velocity');

// tumblr api
var tumblrUrl = config.tumblrUrl;
var apiKey = config.apiKey;

module.exports = React.createClass({
  // mixin
  mixins: [ State ],

  // 初期化
  getInitialState: function(){
    return {
      data: []
    };
  },

  // component更新された時
  componentDidUpdate: function(){
    console.log('singleが読み込まれた');

    // velocity
    $('.rectangle').velocity(
      {
        width: '100%',
        height: '700px'
      },
      {
        duration: 800,
        easing: 'easeInOutQuart'
      }
    );
    $('#canvas').velocity({
      opacity: 0
    }, {
      duration: 600,
      easing: 'easeInOutCubic'
    });
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

    // tags
    var tags = [];
    for (var i = 0; i < article.tags.length; i++) {
      tags.push(<li>{article.tags[i]}</li>);
    }

    return (
      <main className="content content--single">
        <article className='article'>
          <header className="article__header">
            <h1 className="article__title">{article.title}</h1>
            <div className="article__info">
              <span className="article__date">{moment(new Date(article.date)).format('YYYY.M.D')}</span>
              <ul className="article__tag">{tags}</ul>
            </div>
            <div className="article__notes">{article.noteCount} NOTES</div>
          </header>
          <div className="article__body" dangerouslySetInnerHTML={{__html: article.body}} />
        </article>

        <div className="content__back">
          <Link className='button' to={'/'}>BACK</Link>
        </div>
      </main>
    );
  }
});