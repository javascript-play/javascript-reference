
/**
* Exist property can be chnage.
* Can't add new property.
* Mark all exsit property as non-configurable.
*/
exports.seal = function() {
  var obj = new Object();
  obj.value = "Hello world";
  Object.seal(obj);
  return obj;
};


exports.preventExtensions = function() {
  var obj = new Object();
  obj.value = "Hello world";
  Object.preventExtensions(obj);
  return obj;
};


exports.is = function() {
  var obj1 = {
    value: "Hello wrold",
    count: 10
  };

  var obj2 = {
    value: "Hello world",
    count: 10
  };

  return Object.is(obj1, obj2);
}

exports.prototypeOf = function() {
  var JS = function() { };
  JS.prototype.hi = function() {
    return "Hello world";
  }

  var js = new JS();
  return Object.getPrototypeOf(js);

};

/**
* No 'length' name.
*/
exports.ownPropertyNames = function() {
  var obj = new Object();
  obj.name1 = "name3";
  obj.name2 = "name2";
  obj["name3"] = "name3"
  obj[3] = "3";
  return Object.getOwnPropertyNames(obj);
};

/**
* Default behavior.
* writable: false
* configurable: false
* enumerable: false
* value: undefined
*/
exports.defineProperty = function(field) {
  var obj = new Object();
  Object.defineProperty(obj, field, {
    value: "Hello world",
    writeable: false
  });
  return obj;
}


exports.propertyDescriptor = function(value) {
  var obj = new Object();
  obj.value = value;
  return Object.getOwnPropertyDescriptor(obj, "value");
};


/**
* Freeze object, other code can't delete or change property.
*/
exports.freeze = function(value) {
  var obj = Object.create(Object.prototype);
  obj.value = value;
  Object.freeze(obj);
  return obj;
};
