'use strict';

var React = require('react');

var NotFound = React.createClass({
  render: function(){
    return (
      <div className="article article--notFound">
        404 dayo~~
      </div>
    );
  }
});

module.exports = NotFound;