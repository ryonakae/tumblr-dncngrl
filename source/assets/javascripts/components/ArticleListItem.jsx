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
      tags.push(<li className='articleList__itemInfoTagItem'>{this.props.tags[i]}</li>);
    }

    // post type: textのとき
    if (this.props.type === 'text') {
      return (
        <div className="articleList__item articleList__item--text">
          <div className="articleList__itemContent">
            <h2 className="articleList__itemTitle">
              <Link to={`/post/${this.props.id}/${this.props.slug}`} params={{id:this.props.id, slug:this.props.slug}}>{this.props.title}</Link>
            </h2>
            <div className="articleList__itemBody" dangerouslySetInnerHTML={{__html: this.props.body}} />
            <div className="articleList__itemNotes">{this.props.noteCount} NOTES</div>
          </div>


          <div className="articleList__itemInfo">
            <div className="articleList__itemInfoContent">
              <div className='articleList__itemInfoDate'>{moment(new Date(this.props.date)).format('LL')}</div>
              <ul className="articleList__itemInfoTag">{tags}</ul>
            </div>
            <div className="articleList__itemInfoMore">
              <Link to={`/post/${this.props.id}/${this.props.slug}`} params={{id:this.props.id, slug:this.props.slug}}>MORE</Link>
            </div>
          </div>
        </div>
      );
    }

    // post type: photoのとき
    else if (this.props.type === 'photo') {
      return (
        <div className="articleList__item articleList__item--photo">
          <Link className="articleList__itemImage" to={`/post/${this.props.id}/${this.props.slug}`} params={{id:this.props.id, slug:this.props.slug}}>
            <img src={this.props.photos[0].original_size.url} alt=""/>
            <div className="articleList__itemNotes">{this.props.noteCount} NOTES</div>
          </Link>

          <div className="articleList__itemInfo">
            <div className="articleList__itemInfoContent">
              <div className='articleList__itemInfoDate'>{moment(new Date(this.props.date)).format('LL')}</div>
              <ul className="articleList__itemInfoTag">{tags}</ul>
            </div>
            <div className="articleList__itemInfoMore">
              <Link to={`/post/${this.props.id}/${this.props.slug}`} params={{id:this.props.id, slug:this.props.slug}}>MORE</Link>
            </div>
          </div>
        </div>
      );
    }
  }
});