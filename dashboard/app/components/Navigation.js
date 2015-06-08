var React = require('react');
var Router = require('react-router');
var ExploreContent = require('./ExploreContent');
var SearchContent = require('./SearchContent');
var LoginContent = require('./LoginContent');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Navigation = React.createClass({

  render: function () {
    return (
      <div className="nav-menu">
        { this.props.items.map(function(m, index){
            return <Link key={index} activeClassName="nav-link-focused" className="nav-link" to={m.name}>{m.name}</Link>;
          }) }
        <div className="title">
          <h1> Ripple </h1>
        </div>  
      </div>
    );
  }
});

module.exports = Navigation; 


