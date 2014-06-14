
var ref = require("./reference");

exports.testSeal = function(test) {
  var obj = ref.seal();
  test.equal(obj.value, "Hello world");

  // Still can change property.
  obj.value = "Hi world";
  test.equal(obj.value, "Hi world");

  // Can't add new property.
  obj.newValue = "Hi world";
  test.equal(obj.newValue, undefined);

  // Can't delete property.
  delete obj.value;
  test.equal(obj.value, "Hi world");

  // Configurable was set to false.
  var desc = Object.getOwnPropertyDescriptor(obj, "value");
  test.equal(desc.configurable, false);
  test.equal(desc.enumerable, true);

  // Try to change writable property.
  // Can't not redefine 'configurable', 'value' and 'enumerable'
  Object.defineProperty(obj, "value", { writable: false, value: 'Hi' });

  // Can't update writable property of seal object.
  // Becase this object was set to non-configurable.
  // Writable still 'true'.
  var newDesc = Object.getOwnPropertyDescriptor(obj, "value");
  test.equal(desc.writable, true);

  // Property value not changed.
  test.equal(desc.value, "Hi world");

  test.done();
};

exports.testPreventExtensions = function(test) {
  var obj = ref.preventExtensions();
  test.equal(obj.value, "Hello world");

  // Can't extend property.
  obj.newValue = "Hi world";
  test.equal(obj.newValue, undefined);
  test.done();
};


exports.testIs = function(test) {
  var is = ref.is();
  test.equal(is, false);
  test.done();
}

exports.testPrototypeOf = function(test) {
  var PT = ref.prototypeOf();
  test.ok(typeof(PT) === "object", "prototype is object");

  test.ok(PT.hi() === "Hello world", "hi() === 'Hello world'");
  test.done();
};

exports.testOwnPropertyNames = function(test) {
  var names = ref.ownPropertyNames();
  test.equal(names.length, 4);
  test.ok(names.indexOf("name1") != -1);
  test.ok(names.indexOf("name2") != -1);
  test.ok(names.indexOf("name3") != -1);
  test.ok(names.indexOf("3") != -1);
  test.done();
};


exports.testDefineProperty = function(test) {
  // Create field name "value".
  // Set writable to false.
  var obj = ref.defineProperty("value");
  test.equal(obj.value, "Hello world");

  // Can't write property value.
  obj.value = "Hi world";
  test.equal(obj.value, "Hello world");

  test.done();
};

exports.testPropertyDescriptor = function(test) {
  var obj = ref.propertyDescriptor("Hello world");
  test.equal(obj.value, "Hello world", "Value equal 'Hello world'");
  test.equal(obj.writable, true, 'Writable === true');
  test.equal(obj.configurable, true, 'Configurable === true');
  test.equal(obj.enumerable, true, 'Enumerable === true');
  test.equal(obj.set, null);
  test.equal(obj.get, null);
  test.done();
};


exports.testFreeze = function(test) {
  var obj = ref.freeze("Hello world");

  // can't change property.
  obj.value = "Hi world";
  test.equal(obj.value, "Hello world");

  // can't delete property.
  delete(obj.value);
  test.equal(obj.value, "Hello world");

  // can't add new property.
  obj.newValue = "Hi";
  test.equal(obj.newValue, undefined);

  // can't delete object.
  delete obj;
  test.notEqual(obj, undefined);

  test.done();
};
