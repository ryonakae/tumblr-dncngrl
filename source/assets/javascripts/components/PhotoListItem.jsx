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
      hover: false,
      overlay: null,
      date: null,
      tag: null,
      note: null
    };
  },

  componentDidMount: function(){
    this.setState({
      overlay: React.findDOMNode(this.refs.overlay),
      date: React.findDOMNode(this.refs.date),
      tag: React.findDOMNode(this.refs.tag),
      note: React.findDOMNode(this.refs.note)
    });
  },

  // マウスオーバー
  mouseOver: function(){
    // velocity
    $(this.state.overlay).velocity({
      opacity: 1
    }, {
      duration: 500,
      delay: 0,
      easing: 'ease'
    });
    $(this.state.date).velocity({
      opacity: 1,
      top: 0
    }, {
      duration: 400,
      delay: 350,
      easing: 'easeOutCubic'
    });
    $(this.state.tag).velocity({
      opacity: 1,
      top: 0
    },{
      duration: 400,
      delay: 400,
      easing: 'easeOutCubic'
    });
    $(this.state.note).velocity({
      opacity: 1,
      top: 0
    }, {
      duration: 400,
      delay: 450,
      easing: 'easeOutCubic'
    });
  },

  // マウスアウト
  mouseOut: function(){
    // velocity
    $(this.state.note).velocity('stop').velocity('reverse', {
      duration: 200,
      delay: 0
    });
    $(this.state.tag).velocity('stop').velocity('reverse', {
      duration: 200,
      delay: 50
    });
    $(this.state.date).velocity('stop').velocity('reverse', {
      duration: 200,
      delay: 100
    });
    $(this.state.overlay).velocity('stop').velocity('reverse', {
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
      <article className="photoList__item" onMouseEnter={this.mouseOver} onMouseLeave={this.mouseOut}>
        <div className="photoList__itemInner" style={{backgroundImage:`url(${this.props.photos[0].original_size.url})`}}>
          <Link to={`/post/${this.props.id}/${this.props.slug}`} params={{id:this.props.id, slug:this.props.slug}}>
            <div className="photoList__itemOverlay" ref='overlay'>
              <div className="photoList__itemOverlayInner">
                <h2 className='photoList__itemDate' ref='date'>{moment.unix(new Date(this.props.timestamp)).format('YYYY.M.D')}</h2>
                <ul className="photoList__itemTag" ref='tag'>{tags}</ul>
                <div className="photoList__itemNotes" ref='note'>{this.props.noteCount} NOTES</div>
              </div>
            </div>
          </Link>
        </div>
      </article>
    );
  }
});