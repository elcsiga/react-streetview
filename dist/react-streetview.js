(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ReactStreetview = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
};

var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';

module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
        var keys = Object.getOwnPropertyNames(sourceComponent);

        /* istanbul ignore else */
        if (isGetOwnPropertySymbolsAvailable) {
            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
                try {
                    targetComponent[keys[i]] = sourceComponent[keys[i]];
                } catch (error) {

                }
            }
        }
    }

    return targetComponent;
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

function getScript(globalPath) {

  if (typeof window === 'undefined') {
    return null;
  }

  var paths = globalPath.split('.');
  var root = window;

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    var prop = root[path];

    if (typeof prop === 'undefined') {
      return null;
    }

    root = prop;
  }

  return root;
}

function getScriptLoader(dep, callback) {
  var _this = this;

  if (typeof document === 'undefined') {
    return null;
  }

  var globalPath = dep.globalPath;
  var url = dep.url;
  var jsonp = dep.jsonp;

  var scriptLoader = document.createElement('script');

  if (jsonp) {
    var _dep$callbackName = dep.callbackName;
    var callbackName = _dep$callbackName === undefined ? '_async_' + globalPath.replace('.', '_') : _dep$callbackName;

    url = '' + url + (url.indexOf('?') > -1 ? '&' : '?') + 'callback=' + callbackName;

    window[callbackName] = callback;
  } else {
    scriptLoader.onload = callback;
    scriptLoader.onreadystatechange = function () {
      if (_this.readyState === 'loaded') {
        window.setTimeout(scriptLoader.onload, 0);
      }
    };
  }

  scriptLoader.async = 1;
  scriptLoader.src = url;

  return scriptLoader;
}

var asyncLoad = function asyncLoad(mapScriptsToProps) {

  function getInitialState(props) {
    var dependencies = mapScriptsToProps(props);

    return Object.keys(dependencies).reduce(function (states, name) {
      return _extends({}, states, _defineProperty({}, name, getScript(dependencies[name].globalPath)));
    }, {});
  }

  return function (Component) {
    var AsyncLoaded = (function (_React$Component) {
      _inherits(AsyncLoaded, _React$Component);

      function AsyncLoaded() {
        _classCallCheck(this, AsyncLoaded);

        _get(Object.getPrototypeOf(AsyncLoaded.prototype), 'constructor', this).apply(this, arguments);

        this.displayName = 'AsyncLoaded(' + getDisplayName(Component) + ')';
        this.state = getInitialState(this.props);
      }

      _createClass(AsyncLoaded, [{
        key: 'loadScripts',
        value: function loadScripts(dependencies) {
          var _this2 = this;

          return Object.keys(dependencies).filter(function (name) {
            return _this2.state[name] === null;
          }).map(function (name) {
            var dep = dependencies[name];
            return getScriptLoader(dep, _this2.loadHandler.bind(_this2, name, dep.globalPath));
          }).map(function (scriptLoader) {
            if (typeof document !== 'undefined') {
              document.body.appendChild(scriptLoader);
            }
          });
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.loadScripts(mapScriptsToProps(this.props));
        }

        /**
         * Support again in the next version
         */

        // componentWillReceiveProps (nextProps) {
        //   this.setState(getInitialState(nextProps));
        // }
        //
        // componentDidUpdate (nextProps) {
        //   const dependencies = mapScriptsToProps(nextProps);
        //
        //   this.loadScripts(dependencies);
        // }

      }, {
        key: 'loadHandler',
        value: function loadHandler(name, globalPath) {
          var script = getScript(globalPath);

          if (script !== null) {
            this.setState(_defineProperty({}, name, script));
          }
        }
      }, {
        key: 'injectScripts',
        value: function injectScripts(component) {
          return _react2['default'].cloneElement(_react2['default'].createElement(component, this.props), this.state);
        }
      }, {
        key: 'render',
        value: function render() {
          return this.injectScripts(Component);
        }
      }]);

      return AsyncLoaded;
    })(_react2['default'].Component);

    return (0, _hoistNonReactStatics2['default'])(AsyncLoaded, Component);
  };
};

exports['default'] = asyncLoad;
module.exports = exports['default'];
},{"hoist-non-react-statics":1,"react":undefined}],3:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAsyncLoader = require('react-async-loader');

var _reactAsyncLoader2 = _interopRequireDefault(_reactAsyncLoader);

var ReactStreetview = (function (_React$Component) {
	_inherits(ReactStreetview, _React$Component);

	function ReactStreetview() {
		_classCallCheck(this, ReactStreetview);

		_get(Object.getPrototypeOf(ReactStreetview.prototype), 'constructor', this).call(this);
		this.streetView = null;
	}

	_createClass(ReactStreetview, [{
		key: 'initialize',
		value: function initialize(canvas) {
			var _this = this;

			if (this.props.googleMaps && this.streetView == null) {
				this.streetView = new this.props.googleMaps.StreetViewPanorama(canvas, this.props.streetViewPanoramaOptions);

				this.streetView.addListener('position_changed', function () {
					if (_this.props.onPositionChanged) {
						_this.props.onPositionChanged(_this.streetView.getPosition());
					}
				});

				this.streetView.addListener('pov_changed', function () {
					if (_this.props.onPovChanged) {
						_this.props.onPovChanged(_this.streetView.getPov());
					}
				});
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.initialize(_reactDom2['default'].findDOMNode(this));
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.initialize(_reactDom2['default'].findDOMNode(this));
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			if (this.streetView) {
				this.props.googleMaps.event.clearInstanceListeners(this.streetView);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2['default'].createElement('div', {
				style: {
					height: '100%'
				}
			});
		}
	}]);

	return ReactStreetview;
})(_react2['default'].Component);

ReactStreetview.propTypes = {
	apiKey: _react2['default'].PropTypes.string.isRequired,
	streetViewPanoramaOptions: _react2['default'].PropTypes.object.isRequired,
	onPositionChanged: _react2['default'].PropTypes.func,
	onPovChanged: _react2['default'].PropTypes.func
};

ReactStreetview.defaultProps = {
	streetViewPanoramaOptions: {
		position: { lat: 46.9171876, lng: 17.8951832 },
		pov: { heading: 0, pitch: 0 },
		zoom: 1
	}
};

function mapScriptsToProps(props) {
	var googleMapsApiKey = props.apiKey;
	return {
		googleMaps: {
			globalPath: 'google.maps',
			url: 'https://maps.googleapis.com/maps/api/js?key=' + googleMapsApiKey,
			jsonp: true
		}
	};
}

exports['default'] = (0, _reactAsyncLoader2['default'])(mapScriptsToProps)(ReactStreetview);
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"react-async-loader":2,"react-dom":undefined}]},{},[3])(3)
});