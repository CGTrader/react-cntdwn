'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var COUNTDOWN_NOT_STARTED = 1;
var COUNTDOWN_STARTED = 2;
var COUNTDOWN_FINISHED = 3;

var Countdown = function (_Component) {
  _inherits(Countdown, _Component);

  function Countdown(props) {
    _classCallCheck(this, Countdown);

    var _this = _possibleConstructorReturn(this, (Countdown.__proto__ || Object.getPrototypeOf(Countdown)).call(this, props));

    _this.state = {
      remainingTime: 0,
      status: COUNTDOWN_NOT_STARTED,
      intervalId: null
    };
    _this.addLeadingZero = _this.addLeadingZero.bind(_this);
    _this.calculateRemainingTime = _this.calculateRemainingTime.bind(_this);
    _this.renderRemainingTime = _this.renderRemainingTime.bind(_this);
    _this.tick = _this.tick.bind(_this);
    return _this;
  }

  _createClass(Countdown, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      setTimeout(function () {
        var timer = setInterval(function () {
          _this2.tick();
        }, _this2.props.interval);

        _this2.setState({
          status: COUNTDOWN_STARTED,
          intervalId: timer
        });

        _this2.tick();
      }, this.props.startDelay);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.state.intervalId);
    }
  }, {
    key: 'calculateRemainingTime',
    value: function calculateRemainingTime() {
      return -1 * (0, _moment2.default)().diff(this.props.targetDate);
    }
  }, {
    key: 'addLeadingZero',
    value: function addLeadingZero(value) {
      if (value < 10) {
        return '0' + value.toString();
      }
      return value;
    }
  }, {
    key: 'tick',
    value: function tick() {
      this.setState({
        remainingTime: this.calculateRemainingTime()
      });

      if (this.state.remainingTime <= 0) {
        this.setState({
          status: COUNTDOWN_FINISHED
        });

        if (this.props.onFinished) {
          this.props.onFinished();
        }
        clearInterval(this.state.intervalId);
      }
    }
  }, {
    key: 'renderRemainingTime',
    value: function renderRemainingTime() {
      var html = [];
      var _props = this.props,
          format = _props.format,
          leadingZero = _props.leadingZero,
          timeSeparator = _props.timeSeparator;
      var remainingTime = this.state.remainingTime;


      if (format.day) {
        var days = Math.floor(_moment2.default.duration(remainingTime).as('days'));
        if (leadingZero) {
          days = this.addLeadingZero(days);
        }
        html.push(_react2.default.createElement(
          'span',
          { className: 'react-cntdwn-day', key: 'day' },
          days,
          '\xA0'
        ));
      }

      if (format.hour) {
        var hours = _moment2.default.duration(remainingTime).get('hours');
        if (leadingZero) {
          hours = this.addLeadingZero(hours);
        }
        html.push(_react2.default.createElement(
          'span',
          { className: 'react-cntdwn-hour', key: 'hour' },
          hours,
          timeSeparator
        ));
      }

      if (format.minute) {
        var minutes = _moment2.default.duration(remainingTime).get('minutes');
        if (leadingZero) {
          minutes = this.addLeadingZero(minutes);
        }
        html.push(_react2.default.createElement(
          'span',
          { className: 'react-cntdwn-minute', key: 'minute' },
          minutes,
          timeSeparator
        ));
      }

      if (format.second) {
        var seconds = _moment2.default.duration(remainingTime).get('seconds');
        if (leadingZero) {
          seconds = this.addLeadingZero(seconds);
        }
        html.push(_react2.default.createElement(
          'span',
          { className: 'react-cntdwn-second', key: 'second' },
          seconds
        ));
      }

      return html;
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.status === COUNTDOWN_NOT_STARTED) {
        return _react2.default.createElement('span', null);
      }
      return _react2.default.createElement(
        'div',
        { className: 'react-cntdwn-timer' },
        this.renderRemainingTime()
      );
    }
  }]);

  return Countdown;
}(_react.Component);

exports.default = Countdown;


Countdown.defaultProps = {
  interval: 1000,
  startDelay: 0,
  format: {
    hour: 'HH',
    minute: 'MM',
    second: 'SS'
  },
  timeSeparator: ' ',
  leadingZero: false
};