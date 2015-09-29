'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var moment = require('moment');
require('jquery');
require('velocity');

module.exports = React.createClass({
  getInitialState: function(){
    return{
      hover: false
    };
  },

  // マウスオーバー
  mouseOver: function(){
    // Native DOM取得してからjQueryオブジェクトに変換
    // ref属性で指定した名前でrefsからcomponentを参照できる(つらい)
    var overlay = $(React.findDOMNode(this.refs.overlay));
    var date = $(React.findDOMNode(this.refs.date));
    var tag = $(React.findDOMNode(this.refs.tag));
    var note = $(React.findDOMNode(this.refs.note));

    // velocity
    overlay.velocity({
      opacity: 1,
      top: 0
    }, {
      duration: 500,
      delay: 0,
      easing: 'easeInOutQuart'
    });
    date.velocity({
      opacity: 1,
      top: 0
    }, {
      duration: 400,
      delay: 450,
      easing: 'easeOutCubic'
    });
    tag.velocity({
      opacity: 1,
      top: 0
    },{
      duration: 400,
      delay: 500,
      easing: 'easeOutCubic'
    });
    note.velocity({
      opacity: 1,
      top: 0
    }, {
      duration: 400,
      delay: 550,
      easing: 'easeOutCubic'
    });
  },

  // マウスアウト
  mouseOut: function(){
    var overlay = $(React.findDOMNode(this.refs.overlay));
    var date = $(React.findDOMNode(this.refs.date));
    var tag = $(React.findDOMNode(this.refs.tag));
    var note = $(React.findDOMNode(this.refs.note));

    // velocity
    note.velocity('stop').velocity('reverse', {
      duration: 200,
      delay: 0
    });
    tag.velocity('stop').velocity('reverse', {
      duration: 200,
      delay: 50
    });
    date.velocity('stop').velocity('reverse', {
      duration: 200,
      delay: 100
    });
    overlay.velocity('stop').velocity('reverse', {
      duration: 400,
      delay: 100
    });
  },

  render: function(){
    // tags
    var tags = [];
    for (var i = 0; i < this.props.tags.length; i++) {
      tags.push(<li>{this.props.tags[i]}</li>);
    }

    return (
      <article className="photoList__item" onMouseEnter={this.mouseOver} onMouseLeave={this.mouseOut} style={{backgroundImage:`url(${this.props.photos[0].original_size.url})`}}>
        <Link to={`/post/${this.props.id}/${this.props.slug}`} params={{id:this.props.id, slug:this.props.slug}}>
          <div className="photoList__itemOverlay" ref='overlay'>
            <div className="photoList__itemOverlayInner">
              <h2 className='photoList__itemDate' ref='date'>{moment(new Date(this.props.date)).format('YYYY.M.D')}</h2>
              <ul className="photoList__itemTag" ref='tag'>{tags}</ul>
              <div className="photoList__itemNotes" ref='note'>{this.props.noteCount} NOTES</div>
            </div>
          </div>
        </Link>
      </article>
    );
  }
});