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
    console.log('over');

    // Native DOM取得してからjQueryオブジェクトに変換
    // ref属性で指定した名前でrefsからcomponentを参照できる(つらい)
    var overlay = $(React.findDOMNode(this.refs.overlay));

    // velocity
    overlay.velocity(
      {
        opacity: 1,
        top: 0
      },
      {
        duration: 800,
        easing: 'easeInOutQuart'
      }
    );
  },

  // マウスアウト
  mouseOut: function(){
    console.log('out');

    var overlay = $(React.findDOMNode(this.refs.overlay));

    // velocity
    overlay.velocity('stop').velocity('reverse', 400);
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
              <h2 className='photoList__itemDate'>{moment(new Date(this.props.date)).format('YYYY.M.D')}</h2>
              <ul className="photoList__itemTag">{tags}</ul>
              <div className="photoList__itemNotes">{this.props.noteCount} NOTES</div>
            </div>
          </div>
        </Link>
      </article>
    );
  }
});