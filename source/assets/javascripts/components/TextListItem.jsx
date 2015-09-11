'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var moment = require('moment');

module.exports = React.createClass({
  render: function(){
    // tags
    var tags = [];
    for (var i = 0; i < this.props.tags.length; i++) {
      tags.push(<li>{this.props.tags[i]}</li>);
    }

    return (
      <article className="textList__item">
        <h2 className="textList__itemTitle">
          <Link to={`/post/${this.props.id}/${this.props.slug}`} params={{id:this.props.id, slug:this.props.slug}}>{this.props.title}</Link>
        </h2>

        <div className="textList__itemInfo">
          <span className='textList__itemDate'>{moment(new Date(this.props.date)).format('YYYY.M.D')}</span>
          <ul className="textList__itemTag">{tags}</ul>
        </div>
      </article>
    );
  }
});