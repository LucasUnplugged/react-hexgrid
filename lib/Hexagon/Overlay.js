(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "prop-types", "../Layout"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"), require("prop-types"), require("../Layout"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.React, global.propTypes, global.Layout);
    global.Overlay = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _Layout) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var OverlayInner = function (_PureComponent) {
    _inherits(OverlayInner, _PureComponent);

    function OverlayInner() {
      _classCallCheck(this, OverlayInner);

      return _possibleConstructorReturn(this, (OverlayInner.__proto__ || Object.getPrototypeOf(OverlayInner)).apply(this, arguments));
    }

    _createClass(OverlayInner, [{
      key: "render",
      value: function render() {
        var _props = this.props,
            attributes = _props.attributes,
            children = _props.children,
            className = _props.className,
            fill = _props.fill,
            points = _props.points,
            style = _props.style;

        return _react2.default.createElement(
          "g",
          _extends({}, attributes, { className: className }),
          _react2.default.createElement("polygon", {
            points: points,
            style: style,
            fill: fill ? "url(#" + fill + ")" : null
          }),
          children
        );
      }
    }]);

    return OverlayInner;
  }(_react.PureComponent);

  OverlayInner.propTypes = {
    attributes: _propTypes2.default.object,
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    fill: _propTypes2.default.string,
    points: _propTypes2.default.string,
    style: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object])
  };

  OverlayInner.defaultProps = {
    className: "hexagon-overlay"
  };

  var Overlay = function (_PureComponent2) {
    _inherits(Overlay, _PureComponent2);

    function Overlay() {
      _classCallCheck(this, Overlay);

      return _possibleConstructorReturn(this, (Overlay.__proto__ || Object.getPrototypeOf(Overlay)).apply(this, arguments));
    }

    _createClass(Overlay, [{
      key: "render",
      value: function render() {
        var _this3 = this;

        return _react2.default.createElement(
          _Layout.LayoutContext.Consumer,
          null,
          function (_ref) {
            var points = _ref.points;
            return _react2.default.createElement(OverlayInner, _extends({}, _this3.props, { points: points }));
          }
        );
      }
    }]);

    return Overlay;
  }(_react.PureComponent);

  exports.default = Overlay;
});