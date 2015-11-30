'use strict';

var React = require('react');
var DocumentTitle = require('react-document-title');
require('jquery');
require('velocity');

// components
var Button = require('./Button');

module.exports = React.createClass({
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
    this.props.onLoadStart();
    this.backHide();
  },

  // component更新された時
  componentDidUpdate: function(){
  },

  // コンポーネントの準備完了
  componentDidMount: function(){
    this.props.onLoadSingle();
    this.props.onLoadEnd();
    this.backShow();
  },

  render: function(){
    return (
      <DocumentTitle title='About | Dancing Girl.'>
        <main className="content content--single content--page">
          <article className='article'>
            <header className="article__header">
              <h1 className="article__title">ABOUT</h1>
            </header>

            <div className="article__body">
              <img src="http://static.tumblr.com/xm1j4jr/GKXnym2bx/about_visual.png"/>

              <p>
                Dancing Girl.は<a href="http://brdr.jp" target="_blank">Ryo Nakae</a>主宰の同人サークルです。<br />
                アニメ・マンガ作品の二次創作を中心に活動予定。
              </p>

              <h2>Member</h2>
              <h3>Ryo Nakae</h3>
              <p>Webデザイナー。1989年生まれ。サークル「Dancing Girl.」主宰。</p>
              <ul>
                <li><a href="https://www.facebook.com/ryo.nakae" target="_blank">Facebook</a></li>
                <li><a href="https://twitter.com/ryo_dg" target="_blank">Twitter</a></li>
                <li><a href="https://dribbble.com/ryo_dg" target="_blank">Dribbble</a></li>
                <li><a href="https://www.behance.net/ryo_dg" target="_blank">Behance</a></li>
                <li><a href="https://jypg.net/ryo_dg" target="_blank">JAYPEG</a></li>
                <li><a href="https://github.com/ryonakae" target="_blank">GitHub</a></li>
                <li><a href="http://pixiv.me/ryo_dg" target="_blank">Pixiv</a></li>
                <li><a href="mailto:me@ryonakae.com">E-Mail</a></li>
              </ul>
            </div>

            <div className="article__back">
              <Button type='link' href='/'>BACK</Button>
            </div>
          </article>
        </main>
      </DocumentTitle>
    );
  }
});