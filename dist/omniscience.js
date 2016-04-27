(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["omniscience"] = factory();
	else
		root["omniscience"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.watch = undefined;

	var _watch = __webpack_require__(2);

	var _watch2 = _interopRequireDefault(_watch);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	exports.watch = _watch2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	// from http://stackoverflow.com/questions/3231459/create-unique-id-with-javascript
	var id = 0;

	exports.default = function () {
		return id++;
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _d3Dispatch = __webpack_require__(3);

	var _d3Dispatch2 = _interopRequireDefault(_d3Dispatch);

	var _uid = __webpack_require__(1);

	var _uid2 = _interopRequireDefault(_uid);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

	function beginsWithUnderscore(s) {
	  return s.slice(0, 1) == '_';
	}

	function isReserved(s) {
	  return ['on', 'sort'].indexOf(s) >= 0;
	}

	function watch(o) {
	  if (o._watchable) {
	    return o;
	  }

	  if (!o._id) {
	    Object.defineProperty(o, '_id', { enumerable: false, value: (0, _uid2.default)() });
	  }

	  var dispatch = _d3Dispatch2.default.dispatch('change', 'syncChange');
	  var timeout = null;

	  o._unwatch = function () {
	    // hacking the internals of d3.dispatch to just remove all handlers
	    dispatch._.change = [];
	    dispatch._.syncChange = [];
	    delete o._watchable;
	  };
	  Object.defineProperty(o, '_unwatch', { enumerable: false });

	  function fireChangeAtEndOfThread(info) {
	    dispatch.call('syncChange');
	    if (timeout == null) {
	      timeout = setTimeout(function () {
	        timeout = null;
	        dispatch.call('change');
	      }, 0);
	    }
	  }

	  var handler = {
	    set: function set(target, key, value, receiver) {
	      var hidden = beginsWithUnderscore(key) || isReserved(key);
	      if (hidden) {
	        target[key] = value;
	        Object.defineProperty(target, key, { enumerable: false });
	        return true;
	      }
	      var changed = target[key] != value;
	      var alreadyExisted = key in target;
	      var valueIsObject = typeof value == 'object';
	      // if a new object property is added, then watch that too
	      if (value && valueIsObject && !alreadyExisted && !hidden) {
	        value = watch(value);
	        value.on('syncChange.' + o._id, function () {
	          fireChangeAtEndOfThread();
	        });
	      }
	      target[key] = value;
	      if (changed && !hidden) {
	        fireChangeAtEndOfThread();
	      }
	      return true;
	    },

	    deleteProperty: function deleteProperty(target, property) {
	      // do a cleanup on the child object. Make it no
	      // longer watchable
	      var child = target[property];
	      if (child._unwatch) {
	        child._unwatch();
	      }
	      delete target[property];
	      fireChangeAtEndOfThread();
	      return true;
	    }
	  };

	  var proxy = new Proxy(o, handler);
	  proxy.on = function (type, handler) {
	    dispatch.on(type, handler);
	  };

	  Object.keys(o).forEach(function (key) {
	    if (!beginsWithUnderscore(key) && typeof o[key] == 'object') {
	      o[key] = watch(o[key]);
	      o[key].on('syncChange.' + o._id, function () {
	        fireChangeAtEndOfThread();
	      });
	    }
	  });

	  Object.defineProperty(o, '_watchable', { enumerable: false, configurable: true, value: true });
	  return proxy;
	}

	exports.default = watch;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.d3_dispatch = global.d3_dispatch || {})));
	}(this, function (exports) { 'use strict';

	  var version = "0.4.3";

	  var noop = {value: function() {}};

	  function dispatch() {
	    for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
	      if (!(t = arguments[i] + "") || (t in _)) throw new Error;
	      _[t] = [];
	    }
	    return new Dispatch(_);
	  }

	  function Dispatch(_) {
	    this._ = _;
	  }

	  function parseTypenames(typenames, types) {
	    return typenames.trim().split(/^|\s+/).map(function(t) {
	      var name = "", i = t.indexOf(".");
	      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
	      if (t && !types.hasOwnProperty(t)) throw new Error;
	      return {type: t, name: name};
	    });
	  }

	  Dispatch.prototype = dispatch.prototype = {
	    constructor: Dispatch,
	    on: function(typename, callback) {
	      var _ = this._,
	          T = parseTypenames(typename + "", _),
	          t,
	          i = -1,
	          n = T.length;

	      // If no callback was specified, return the callback of the given type and name.
	      if (arguments.length < 2) {
	        while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
	        return;
	      }

	      // If a type was specified, set the callback for the given type and name.
	      // Otherwise, if a null callback was specified, remove callbacks of the given name.
	      if (callback != null && typeof callback !== "function") throw new Error;
	      while (++i < n) {
	        if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
	        else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
	      }

	      return this;
	    },
	    copy: function() {
	      var copy = {}, _ = this._;
	      for (var t in _) copy[t] = _[t].slice();
	      return new Dispatch(copy);
	    },
	    call: function(type, that) {
	      if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n; i < n; ++i) args[i] = arguments[i + 2];
	      this.apply(type, that, args);
	    },
	    apply: function(type, that, args) {
	      if (!this._.hasOwnProperty(type)) throw new Error;
	      for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
	    }
	  };

	  function get(type, name) {
	    for (var i = 0, n = type.length, c; i < n; ++i) {
	      if ((c = type[i]).name === name) {
	        return c.value;
	      }
	    }
	  }

	  function set(type, name, callback) {
	    for (var i = 0, n = type.length; i < n; ++i) {
	      if (type[i].name === name) {
	        type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
	        break;
	      }
	    }
	    if (callback != null) type.push({name: name, value: callback});
	    return type;
	  }

	  exports.version = version;
	  exports.dispatch = dispatch;

	}));

/***/ }
/******/ ])
});
;