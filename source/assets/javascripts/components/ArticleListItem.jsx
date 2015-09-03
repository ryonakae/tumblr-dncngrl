'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var moment = require('moment');

module.exports = React.createClass({
  render: function(){
    return (
      <div className="entryList__item">
        <h2 className="entryList__itemTitle">
          <Link to={`/post/${this.props.id}/${this.props.slug}`} params={{id:this.props.id, slug:this.props.slug}}>{this.props.title}</Link>
        </h2>
        <div className="entryList__itemDate">
          <small>{moment(new Date(this.props.date)).format('LL')}</small>
        </div>
      </div>
    );
  }
});