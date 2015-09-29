'use strict';

var React = require('react');
var DocumentTitle = require('react-document-title');
require('jquery');
require('velocity');

// components
var Button = require('./Button');

module.exports = React.createClass({
  // component更新された時
  componentDidMount: function(){
    // velocity
    $('.rectangle').velocity({
      width: '100%',
      height: '650px'
    }, {
      duration: 600,
      easing: 'easeInOutQuart'
    });
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