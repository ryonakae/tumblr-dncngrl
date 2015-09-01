'use strict';

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

// components
var App = require('./components/App');
var Article = require('./components/Article');
var Single = require('./components/Single');

// routes
var routes = (
  <Route name="App" path="/" handler={App}>
    <Route name="Single" path='/post/:id/:slug' handler={Single}/>
    <DefaultRoute handler={Article}/>
  </Route>
);

// render
Router.run(routes, function(Handler){
  React.render(
    <Handler />, document.body
  );
});

// load stylus
require('../stylesheets/style.styl');