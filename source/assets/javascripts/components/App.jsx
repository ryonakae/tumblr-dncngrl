'use strict';

var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var DocumentTitle = require('react-document-title');
var uaParser = require('ua-parser-js');
require('jquery');
require('velocity');

// ua parser
var parser = new uaParser();
var ua = parser.getResult();

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

  beforeLoad: function(){
    this.footerHide();
  },

  transformRectangleIndex: function(){
    var self = this;
    var rectWidth;
    var rectHeight;

    if ( $(window).width() <= 500 ) {
      rectWidth = '100%';
      rectHeight = '550px';
    }
    else {
      rectWidth = '50%';
      rectHeight = '600px';
    }

    // velocity
    $('.rectangle').velocity({
      width: rectWidth,
      height: rectHeight
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
    // uaのdevice typeがモバイルの時はCanvasを描画しない
    var canvasDom;
    if (ua.device.type !== 'mobile') {
      canvasDom = <Canvas />;
    }

    return (
      <DocumentTitle title='Dancing Girl.'>
        <div className='app'>
          <Header />
          <RouteHandler
            onLoadStart={this.loaderShow}
            onLoadEnd={this.loaderHide}
            onLoadIndex={this.transformRectangleIndex}
            onLoadSingle={this.transformRectangleSingle}
            onBeforeLoad={this.beforeLoad}
          />
          <Footer />
          <FixedContent />
          <Rectangle />
          {canvasDom}
        </div>
      </DocumentTitle>
    );
  }
});