'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var DocumentTitle = require('react-document-title');
require('jquery');
require('velocity');

// components
var Header = require('./Header');
var Footer = require('./Footer');
var FixedContent = require('./FixedContent');
var Rectangle = require('./Rectangle');
var Canvas = require('./Canvas');

module.exports = React.createClass({
  contentHide: function(){
    $('.content').css({'opacity':0});
  },
  contentFadeIn: function(){
    $('.content').velocity({
      opacity: 1
    },{
      duration: 450,
      delay: 400,
      easing: 'ease'
    });
  },

  footerHide: function(){
    $('.footer').css({'opacity': 0});
  },
  footerFadeIn: function(){
    $('.footer').velocity({
      opacity: 1
    },{
      duration: 450,
      delay: 400,
      easing: 'ease'
    });
  },

  loaderShow: function(){
    $('.header__titleLoader').velocity({
      opacity: 1
    }, {
      duration: 250,
      easing: 'ease'
    });
  },
  loaderHide: function(){
    $('.header__titleLoader').velocity({
      opacity: 0
    }, {
      duration: 450,
      delay: 600,
      easing: 'ease'
    });
  },

  transformRectangleIndex: function(){
    var self = this;

    // velocity
    $('.rectangle').velocity({
      width: '50%',
      height: '600px'
    }, {
      duration: 600,
      easing: 'easeInOutCirc',
      begin: function(){
        self.contentHide();
        self.footerHide();
      },
      complete: function(){
        self.contentFadeIn();
        self.footerFadeIn();
      }
    });
  },

  transformRectangleSingle: function(){
    var self = this;

    // velocity
    $('.rectangle').velocity({
      width: '100%',
      height: '650px'
    }, {
      duration: 600,
      easing: 'easeInOutCirc',
      begin: function(){
        self.contentHide();
        self.footerHide();
      },
      complete: function(){
        self.contentFadeIn();
        self.footerFadeIn();
      }
    });
  },

  componentWillMount: function(){
  },

  // DOM初期化された時
  componentDidMount: function(){
  },

  // component更新された時
  componentDidUpdate: function(){
  },

  render: function(){
    return (
      <DocumentTitle title='Dancing Girl.'>
        <div className='app'>
          <Header />
          <RouteHandler
            onLoadStart={this.loaderShow}
            onLoadEnd={this.loaderHide}
            onLoadIndex={this.transformRectangleIndex}
            onLoadSingle={this.transformRectangleSingle}
            onBeforeLoad={this.footerHide}
          />
          <Footer />
          <FixedContent />
          <Rectangle />
          <Canvas />
        </div>
      </DocumentTitle>
    );
  }
});