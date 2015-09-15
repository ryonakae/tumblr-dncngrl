'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var moment = require('moment');
require('jquery');
require('velocity');

module.exports = React.createClass({
  mouseOver: function(){
    console.log('hover');
  },

  render: function(){
    // tags
    var tags = [];
    for (var i = 0; i < this.props.tags.length; i++) {
      tags.push(<li>{this.props.tags[i]}</li>);
    }

    return (
      <article className="photoList__item" onMouseOver={this.mouseOver} style={{backgroundImage:`url(${this.props.photos[0].original_size.url})`}}>
        <Link to={`/post/${this.props.id}/${this.props.slug}`} params={{id:this.props.id, slug:this.props.slug}}>
          <div className="photoList__itemOverlay">
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