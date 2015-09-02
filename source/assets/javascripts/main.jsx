'use strict';

// load stylus
require('../stylesheets/style.styl');

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var Redirect = Router.Redirect;

// components
var App = require('./components/App');
var Article = require('./components/Article');
var Single = require('./components/Single');
var About = require('./components/About');
var NotFound = require('./components/NotFound');

// routes
var routes = (
  <Route name="App" path="/" handler={App}>
    <DefaultRoute handler={Article} />

    <Route name="Single" path='/post/:id/:slug' handler={Single} />

    <Route name="About" path='/about' handler={About} />

    <NotFoundRoute handler={NotFound} />
  </Route>
);

// render
Router.run(routes, Router.HistoryLocation, function(Handler){
  React.render(
    <Handler />, document.body
  );
});