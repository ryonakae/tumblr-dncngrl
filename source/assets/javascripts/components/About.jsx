'use strict';

var React = require('react');
var DocumentTitle = require('react-document-title');
require('jquery');
require('velocity');

// components
var Button = require('./Button');

module.exports = React.createClass({
  componentWillMount: function(){
    this.props.onLoadStart();
  },

  // component更新された時
  componentDidUpdate: function(){
  },

  // コンポーネントの準備完了
  componentDidMount: function(){
    this.props.onLoadSingle();
    this.props.onLoadEnd();
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
              About
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