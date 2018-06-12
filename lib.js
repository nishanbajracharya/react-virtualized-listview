'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var style = {
  container: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  listWrapper: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: 'scroll',
    position: 'absolute',
    boxSizing: 'border-box',
    border: '1px solid #eee'
  },
  list: function list(height) {
    return {
      height: height,
      position: 'relative'
    };
  },
  item: function item(index, height) {
    return {
      height: height,
      left: 0,
      right: 0,
      top: height * index,
      position: 'absolute'
    };
  }
};

var List = function (_React$Component) {
  _inherits(List, _React$Component);

  function List() {
    _classCallCheck(this, List);

    var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this));

    _this.getCount = function () {
      return _this.props.source.length;
    };

    _this.getScrollPosition = function () {
      return _this.state.scrollTop;
    };

    _this.getVisibleHeight = function () {
      return _this.state.visibleHeight;
    };

    _this.getHeight = function () {
      return _this.getCount() * _this.props.rowHeight;
    };

    _this.getWrapper = function () {
      return _reactDom2.default.findDOMNode(_this.listWrapper);
    };

    _this.setScrollPosition = function (event) {
      _this.setState({
        scrollTop: event.target.scrollTop
      });
    };

    _this.checkIfVisible = function (index) {
      var elemPosition = index * _this.props.rowHeight;

      return elemPosition > _this.getScrollPosition() - _this.props.overScanCount * _this.props.rowHeight && elemPosition + _this.props.rowHeight < _this.getScrollPosition() + _this.state.visibleHeight + _this.props.overScanCount * _this.props.rowHeight;
    };

    _this.renderList = function () {
      return _react2.default.createElement(
        'div',
        { style: style.container, ref: function ref(c) {
            return _this.container = c;
          } },
        _react2.default.createElement(
          'div',
          { style: style.listWrapper, ref: function ref(c) {
              return _this.listWrapper = c;
            } },
          _react2.default.createElement(
            'div',
            { style: style.list(_this.getHeight()), ref: function ref(c) {
                return _this.list = c;
              } },
            _this.props.source.map(function (value, index) {
              return _this.checkIfVisible(index) && _this.props.renderItem({
                index: index,
                style: style.item(index, _this.props.rowHeight)
              });
            })
          )
        )
      );
    };

    _this.render = function () {
      return _this.renderList();
    };

    _this.state = {
      scrollTop: 0,
      visibleHeight: 0
    };
    return _this;
  }

  _createClass(List, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.getWrapper().addEventListener('scroll', function (e) {
        _this2.setScrollPosition(e);
      }, true);

      var visibleHeight = parseFloat(window.getComputedStyle(this.getWrapper(), null).getPropertyValue('height'));

      this.setState({ visibleHeight: visibleHeight });
    }
  }]);

  return List;
}(_react2.default.Component);

exports.default = List;


List.defaultProps = {
  source: [],
  rowHeight: 24,
  overScanCount: 5
};
