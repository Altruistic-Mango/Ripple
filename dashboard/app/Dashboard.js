var React = require('react');
var Navigation = require('./components/Navigation');
var ExploreContent = require('./components/ExploreContent');
var AlbumContent = require('./components/AlbumContent');
var LoginContent = require('./components/LoginContent');
var MapComponent = require('./components/MapComponent');
var MapStore = require('./stores/MapStore');
var MapConstants = require('./constants/MapConstants');


var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Dashboard = React.createClass({
  getInitialState: function() {
    return {
      data: null
    };
  },

  componentWillMount : function () {
    MapStore.addListener(MapConstants.GET_DATA, this.handleNewData)
  },

  handleNewData: function(data) {
    //set state so chart renders
    this.setState({
      data: data
    }, function(){
      console.log('set data state in dashboard: ', this.state.data);
    })
  },
  
  render: function () {
    return (
      <div className="viewPort">

        <Navigation items={ [
          {name:'Explore'},
          {name:'Album'},
          {name: 'Login'}
        ] } />
        <div className="side-content">
          <RouteHandler />
        </div>
        <div className="Map">
        <MapComponent data={this.state.data} />
        </div>
      </div>
    );
  }
});

var routes = (
      <Route path="/" handler={Dashboard}>
        <Route name="Explore" handler={ExploreContent} />
        <Route name="Album" handler={AlbumContent} />
        <Route name="Login" handler={LoginContent} />
        <DefaultRoute handler={ExploreContent} />
      </Route>
    );

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('dashboard'));
});




