'use strict';

var React = require('react');
var DocumentTitle = require('react-document-title');

module.exports = React.createClass({
  render: function(){
    return (
      <DocumentTitle title='Not Found. | Dancing Girl.'>
        <main className="content content--single content--page">
          <article className='article'>
            <header className="article__header">
              <h1 className="article__title">404</h1>
            </header>

            <div className="article__body">
              <p>Page Not Found.</p>
            </div>
          </article>
        </main>
      </DocumentTitle>
    );
  }
});