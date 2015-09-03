'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var moment = require('moment');

module.exports = React.createClass({
  render: function(){
    // post type: textのとき
    if (this.props.type === 'text') {
      return (
        <div className="articleList__item articleList__item--text">
          <h2 className="articleList__itemTitle">
            <Link to={`/post/${this.props.id}/${this.props.slug}`} params={{id:this.props.id, slug:this.props.slug}}>{this.props.title}</Link>
          </h2>
          <div className="articleList__itemDate">
            <small>{moment(new Date(this.props.date)).format('LL')}</small>
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
              <ul className="articleList__itemInfoTag">
                <li className="articleList__itemInfoTagItem">Aikatsu!</li>
                <li className="articleList__itemInfoTagItem">Ran Shibuki</li>
              </ul>
            </div>
            <div className="articleList__itemInfoMore">
              <Link to={`/post/${this.props.id}/${this.props.slug}`} params={{id:this.props.id, slug:this.props.slug}}>More</Link>
            </div>
          </div>
        </div>
      );
    }
  }
});