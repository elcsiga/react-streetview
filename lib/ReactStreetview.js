'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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
	apiKey: _propTypes2['default'].string.isRequired,
	streetViewPanoramaOptions: _propTypes2['default'].object.isRequired,
	onPositionChanged: _propTypes2['default'].func,
	onPovChanged: _propTypes2['default'].func
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