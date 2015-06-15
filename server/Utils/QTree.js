function Quadtree(boundaries, maxChildren, root, depth) {

  this.boundaries = boundaries || {
    x: -125.3,
    y: 10,
    width: 57.5,
    height: 57.5
  };

  this.maxChildren = maxChildren || 10;
  this.root = root || null;
  this.depth = depth || 0;
  this.quadrants = [];
  this.children = [];

}

// if we do not check if the coordinate is in bounds the tree will sudivide forever once it reaches max children...
Quadtree.prototype.inBounds = function(item) {
  if (item.x > this.boundaries.x && item.x < this.boundaries.x + this.boundaries.width &&
      item.y > this.boundaries.y && item.y < this.boundaries.y + this.boundaries.height) {
    return true;
  }
  else {
    return false;
  }
}


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
  if (length > this.maxChildren && !(this.depth > 50)) { // (this.depth < this.maxChildren + 1) && 

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
    console.log('quadtree logging item ' + item);

    // find the correct quadrant
    if (this.checkRange(item)) {
      var index = this.findIndex(item);
      return this.quadrants[index].get(item);
    }

    // execute callback if it exists
    else if (callback) {
      callback(this.quadrants[index].get(item));
    }

    // otherwise just return the quadrant
    else {
      return this;
    }
  }

  // our quadtree does not have any quadrants
  else if (!this.quadrants.length && this.children.length) {
    console.log('what else if')

    // invoke callback if it is passed in
    if (callback) {
      callback(this);
    }
    // otherwise just return the quadrant
    else {
      return this;
    }
  }
  // just return the root of the quadtree
  else {
    console.log('returning root');
    return this.root || this;
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

// this check will either update a coordinate based on proximity and a matching user ID. If none is found, it will simply insert the coordinate into the quadtree
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



// find last position then delete according to user id
Quadtree.prototype.remove = function(item) {
  console.log(JSON.stringify(item));
  var quadrant = this.get(item);
  var results = quadrant.children;
  var removedItem;
  item.x = +item.x;
  item.y = +item.y;
  for (var i = 0; i < results.length; i++) {
    if (results[i].userId === item.userId && results[i].timestamp === item.timestamp) {
      console.log('found a match = ' + results[i].userId);
      removedItem = results.splice(i, 1);
    }
  }
  // first perform check on child elements for threshold
  // if the quadrants have less than half of their root node's maximum children, fold the quadrants and re insert the nodes into the single quadrant
  if (this.quadrants.length && results.length < this.maxChildren / 2) {
    this.unfold(quadrant);
  }
  return removedItem;
};



// tree traversal
// this function will traverse through the quadtree, either executing a callback on every child or returning all of the children in a single array
Quadtree.prototype.traverse = function(callback, nodes) {

    if (this.children.length && callback) {
      var length = this.children.length;
      for (var i = 0; i < length; i++) {
          callback(this.children[i]);
      }

      if (this.quadrants.length) {
        var quadLength = this.quadrants.length;
        for (var j = 0; j < quadLength; j++) {
          this.quadrants[j].traverse(callback);
        }
      }
    }

    else if (!callback) {
      var nodes = nodes || [];

      if (this.children.length) {
        return nodes.concat(this.children);
        }

      else if (this.quadrants.length) {
        var quadLength = this.quadrants.length;
        for (var j = 0; j < quadLength; j++) {
          nodes = this.quadrants[j].traverse(null, nodes);
        }
      }
      return nodes;
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
    y: y + height,
    width: width,
    height: height
  }, this.maxChildren, root, depth);

  // top right quadrant
  this.quadrants[1] = new Quadtree({
    x: x + width,
    y: y + height,
    width: width,
    height: height
  }, this.maxChildren, root, depth);

  // bottom left quadrant
  this.quadrants[2] = new Quadtree({
    x: x,
    y: y,
    width: width,
    height: height
  }, this.maxChildren, root, depth);

  // bottom right quadrant
  this.quadrants[3] = new Quadtree({
    x: x + width,
    y: y,
    width: width,
    height: height
  }, this.maxChildren, root, depth);
};


// this function will reduce four quadrants in a node to just the parent, and distribute the nodes within those quadrants to the parent's 
// children array

Quadtree.prototype.unfold = function(quad) {

  // check if root 
  if (quad.children.length && !quad.quadrants.length) {
    quad.root.unfold(quad.root);
  }
  
  var count = 0;

  quad.quadrants.forEach(function(quadrant) {
    count += quadrant.children.length;
  });

  if (count < quad.maxChildren / 2) {
    var nodes = quad.quadrants.reduce(function(acc, quadrant) {
      if (quadrant.children.length) {
        acc = acc.concat(quadrant.children);
      }
      return acc;
    }, []);

    quad.quadrants = [];

    nodes.forEach(function(node) {
      quad.put(node);
    });
  }
 };

// The Checkrange function will check if the radius of a broadcast events exceeds the boundaries of a quadrant, and if so the recursive process of finding
// nodes will stop and the node containing all of the children will be returned in the 'get' function

Quadtree.prototype.checkRange = function(coord, range) {
  var radius = coord.radius * 0.027065;

  var range = range || 
  {
    north: +coord.y + radius, 
    east: +coord.x + radius, 
    south: +coord.y - radius, 
    west: +coord.x - radius,
  };

  var bounds = {
    north: this.boundaries.y + this.boundaries.height,
    east: this.boundaries.x + this.boundaries.width,
    south: this.boundaries.y,
    west: this.boundaries.x,
  };

  if (bounds.north > range.north &&
      bounds.east > range.east &&
      bounds.south < range.south &&
      bounds.west < range.west) 
    {
      return true;
    }

    else {
      return false;
    }
};


module.exports = new Quadtree();

