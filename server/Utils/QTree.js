function Quadtree(boundaries, maxChildren, root, depth) {

  this.boundaries = boundaries || {
    x: -122.526000,
    y: 37.613500,
    width: 0.2,
    height: 0.2
  };
  this.maxChildren = maxChildren || 4;
  this.root = root || this;
  this.depth = depth || 0;
  this.quadrants = [];
  this.children = [];

}


//california

// northwest point
// 41.9874797,-124.2301429

// northeast point
// 41.9874797, -114.7396131

// southwest point
// 32.4969499,-116.9726225

// southeast point
// 32.4969499, -114.7396131







// san francisco
  // northwest point
  // 37.809455, -122.525293

  // northeast point
  // 37.811552, -122.354177

  // southwest point
  // 37.613581, -122.510663

  // southeast point
  // 37.615192, -122.351613

// insert function
Quadtree.prototype.put = function(item) {

  // if our quadrant is divided into sub quadrants...
  if (this.quadrants.length) {

    // find the correct quadrant
    var index = this.findIndex(item);

    // insert the item
    this.quadrants[index].put(item);
    // bail
    return;
  }

  // add the new coordinate object to the children array
  this.children.push(item);

  // check length against the max number of coordinates per quadrant
  var length = this.children.length;
  if (length > this.maxChildren) { // (this.depth < this.maxChildren + 1) && 

    // create new quadrants
    this.subDivide();

    // now add those coordinates to their new quadrants
    for (var i = 0; i < length; i++) {
      this.put(this.children[i]);
    }

    // empty the array of children
    this.children = [];
  }
};


// find function
Quadtree.prototype.get = function(item, callback) {

  // if our quadrant is divided into sub quadrants...
  if (this.quadrants.length) {
    // find the correct quadrant
    var index = this.findIndex(item);

    // execute callback if it exists
    if (callback) {
      callback(this.quadrants[index].get(item));
    }

    // otherwise just return the array of coordinates
    else {
      return this.quadrants[index].get(item);
    }
  }

  // our quadtree does not have any quadrants
  else {
    // invoke callback if it is passed in
    if (callback) {
      callback(this.children);
    }
    // otherwise just return the children
    else {
      return this;
    }
  }
};


// get index
Quadtree.prototype.findIndex = function(item) {

  // create index to return
  var index;

  // find the midpoint of quadrant
  var horizontalMidpoint = this.boundaries.x + (this.boundaries.width / 2);
  var verticalMidpoint = this.boundaries.y + (this.boundaries.height / 2);

  //assign boolean value to check position
  var left = item.x < horizontalMidpoint;
  var bottom = item.y < verticalMidpoint;

  // check the positions for quadrant location to search
  if (left) {
    if (bottom) {
      index = 2;
    } else index = 0;
  } else {
    if (bottom) {
      index = 3;
    } else index = 1;
  }

  // return the quadrant index to getter function...
  return index;
};

Quadtree.prototype.update = function(item) {
  var quadrant = this.get(item);
  var results = quadrant.children;
  var found;
  console.log(JSON.stringify(item));
  results.forEach(function(coord) {
    if (coord.userId === item.userId) {
      console.log('updating user');
      coord.x = item.x;
      coord.y = item.y;
      found = true;
    }
  });
  if (!found) {
    console.log('not found');
    this.put(item);
  }
};


// remove gps data function
// find last position then delete according to id
Quadtree.prototype.remove = function(item) {
  var quadrant = this.get(item);
  var results = quadrant.children;
  item.x = +item.x;
  item.y = +item.y;
  for (var i = 0; i < results.length; i++) {
    if (results[i].userId === item.userId) {
      var removedItem = results.splice(i, 1);
    }
  }
  // first perform check on child elements for threshold
  if (this.quadrants.length && results.length < this.maxChildren / 2) {
    this.unfold(quadrant);
  }
  return removedItem;
};



// tree traversal

Quadtree.prototype.clearOut = function(timestamp) {

  if (this.children.length) {
    var tempChildren = [];
    var length = this.children.length;
    for (var i = 0; i < length; i++) {
      if (timestamp - this.children[i].timestamp < 300000) { // 
        tempChildren.push(this.children[i]);
      }
    }
    this.children = tempChildren;
  }

  else if (this.quadrants.length) {
    var quadLength = this.quadrants.length;
    for (var j = 0; j < quadLength; j++) {
      this.quadrants[j].clearOut(timestamp);
    }
  }
}; 

Quadtree.prototype.traverse = function(callback) {
    if (this.children.length) {
      var length = this.children.length;
      for (var i = 0; i < length; i++) {
          callback(this.children[i]);
      }
    }

  else if (this.quadrants.length) {
    var quadLength = this.quadrants.length;
    for (var j = 0; j < quadLength; j++) {
      this.quadrants[j].traverse(callback);
    }
  }
}





// broadcast function
// use find then find others in same quadrant

// subdivide quadrant when necessary
Quadtree.prototype.subDivide = function() {
  var root = this;
  var depth = this.depth + 1;
  var width = this.boundaries.width / 2;
  var height = this.boundaries.height / 2;
  var x = this.boundaries.x;
  var y = this.boundaries.y;

  // top left quadrant
  this.quadrants[0] = new Quadtree({
    x: x,
    y: y,
    width: width,
    height: height
  }, this.maxChildren, root, depth);

  // top right quadrant
  this.quadrants[1] = new Quadtree({
    x: x + width,
    y: y,
    width: width,
    height: height
  }, this.maxChildren, root, depth);

  // bottom left quadrant
  this.quadrants[2] = new Quadtree({
    x: x,
    y: y + height,
    width: width,
    height: height
  }, this.maxChildren, root, depth);

  // bottom right quadrant
  this.quadrants[3] = new Quadtree({
    x: x + width,
    y: y + height,
    width: width,
    height: height
  }, this.maxChildren, root, depth);
};

Quadtree.prototype.unfold = function(quad) {

  // check if root 
  if (quad.children.length && !quad.quadrants.length) {
    quad.root.unfold(quad.root);
  }
  
  var count = 0;

  quad.quadrants.forEach(function(quadrant) {
    count += quadrant.children.length;
  });

  if (count < quad.maxChildren) {
    var nodes = quad.quadrants.reduce(function(acc, quadrant) {
      if (quadrant.children.length) {
        acc = acc.concat(quadrant.children);
      }
      return acc;
    }, []);

    quad.quadrants = [];

    nodes.forEach(function(node) {
      quad.put(node);
    })
  };
 };


module.exports = new Quadtree();







/*

work in progress

curl -i http://localhost:3000/gps/postdata
curl -i http://localhost:3000/users/list
curl -H "Content-Type: application/json" -X POST -d '{"username" : "test2", "password": "test2"}' http://localhost:3000/users/signup

curl -H "Content-Type: application/json" -X POST -d '{"userId" : "3145326", "x" : "-122.515", "y" : "37.615"}' http://localhost:3000/gps/position

curl -H "Content-Type:application/json" -X POST -d '{"x": "-122.515", "y": "37.615"}' http://localhost:3000/gps/getlocal

curl -H "Content-Type:application/json" -X POST -d '{"x": "-122.515", "y": "37.615", "photoId": "666666", "userId": "2343289", "TTL": "15", "radius": "15", "photoURL" : "http://localhost"}' http://localhost:3000/photos/newPhoto


curl -H "Content-Type:application/json" -X POST -d '{"x": "-122.515", "y": "37.615", "userId": "2343289", "TTL": "55", "radius": "55", "timestamp" : "1432780946323"}' http://localhost:3000/photos/newPhoto


curl -H "Content-Type:application/json" -X POST -d '{"username" : "henry"}' http://localhost:3000/users/clearInbox

curl -H "Content-Type: application/json" -X POST -d '{"x": "-122.515" , "y" : "37.615"}' http://localhost:3000/gps/distance

{userId: "5134983", y: 37.7837719, x: -122.4092927, timestamp: 1432927321487}

curl -H "Content-Type: application/json" -X POST -d '{"y" : "37.7837725", "x" : "-122.4092930", "userId" : "6000000", "timestamp": "1432927321487"}' http://localhost:3000/gps/position

    // Quadtree.prototype.addData = function() {
    //   this.put({x: -122.408978, y: 37.783724, userId: Math.floor(Math.random() * 100000)});
    //   this.put({x: -122.4184462, y: 37.7237467, userId: Math.floor(Math.random() * 100000)});
    //   this.put({x: -122.4832054, y: 37.7241541, userId: Math.floor(Math.random() * 100000)});
    //   this.put({x: -122.4806091, y: 37.7828379, userId: Math.floor(Math.random() * 100000)});
    //   this.put({x: -122.3235064, y: 37.7141402, userId: Math.floor(Math.random() * 100000)});
    //   this.put({x: -122.3646192, y: 37.7032078, userId: Math.floor(Math.random() * 100000)});
    //   this.put({x: -122.4572735, y: 37.6769565, userId: Math.floor(Math.random() * 100000)});
    //   this.put({x: -122.4158602, y: 37.7611788, userId: Math.floor(Math.random() * 100000)});
    //   this.put({x: -122.416182, y: 37.7876884, userId: Math.floor(Math.random() * 100000)});
    //   this.put({x: -122.4275959, y: 37.6725777, userId: Math.floor(Math.random() * 100000)});
    //   this.put({x: -122.4931705, y: 37.6754989, userId: Math.floor(Math.random() * 100000)});
    //   this.put({x: -122.4074967, y: 37.7542639, userId: Math.floor(Math.random() * 100000)});
    //   this.put({x: -122.515, y: 37.615, userId: 4296166});
    //   this.put({x: -122.515, y: 37.619, userId: 4227385});
    //   this.put({x: -122.515, y: 37.618, userId: 1857132});
    // };



// Add functionality to unfold and check radius on elements if
  // radius is greater than the length from one coordinate to the border
    // item.x + radius > x || item.x - radius < x || item.y + radius > y || item.y - y < y
      //force unfold
      //check all node children for distance calculation
      //subdivide using children.forEach(this.put(node))


*/
