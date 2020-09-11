(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "prop-types", "./models/Orientation", "./models/Point"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"), require("prop-types"), require("./models/Orientation"), require("./models/Point"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.React, global.propTypes, global.Orientation, global.Point);
    global.Layout = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _Orientation, _Point) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.LayoutContext = undefined;

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _Orientation2 = _interopRequireDefault(_Orientation);

  var _Point2 = _interopRequireDefault(_Point);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

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

  var LayoutContext = exports.LayoutContext = (0, _react.createContext)({});
  LayoutContext.displayName = "HexGridLayout";

  var Layout = function (_PureComponent) {
    _inherits(Layout, _PureComponent);

    function Layout() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Layout);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Layout.__proto__ || Object.getPrototypeOf(Layout)).call.apply(_ref, [this].concat(args))), _this), _this.getContextValue = function () {
        var _this$props = _this.props,
            children = _this$props.children,
            className = _this$props.className,
            flat = _this$props.flat,
            rest = _objectWithoutProperties(_this$props, ["children", "className", "flat"]);

        var orientation = flat ? Layout.LAYOUT_FLAT : Layout.LAYOUT_POINTY;
        var cornerCoords = _this.calculateCoordinates(orientation);
        var points = cornerCoords.map(function (point) {
          return point.x + "," + point.y;
        }).join(" ");
        var childLayout = Object.assign({}, rest, { orientation: orientation });
        return {
          layout: childLayout,
          points: points
        };
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Layout, [{
      key: "getPointOffset",
      value: function getPointOffset(corner, orientation, size) {
        var angle = 2.0 * Math.PI * (corner + orientation.startAngle) / 6;
        return new _Point2.default(size.x * Math.cos(angle), size.y * Math.sin(angle));
      }
    }, {
      key: "calculateCoordinates",
      value: function calculateCoordinates(orientation) {
        var _this2 = this;

        var corners = [];
        var center = new _Point2.default(0, 0);
        var size = this.props.size;


        Array.from(new Array(6), function (x, i) {
          var offset = _this2.getPointOffset(i, orientation, size);
          var point = new _Point2.default(center.x + offset.x, center.y + offset.y);
          corners.push(point);
        });

        return corners;
      }
    }, {
      key: "render",
      value: function render() {
        var _props = this.props,
            children = _props.children,
            className = _props.className;

        return _react2.default.createElement(
          LayoutContext.Provider,
          { value: this.getContextValue() },
          _react2.default.createElement(
            "g",
            { className: className },
            children
          )
        );
      }
    }]);

    return Layout;
  }(_react.PureComponent);

  Layout.LAYOUT_FLAT = new _Orientation2.default(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);
  Layout.LAYOUT_POINTY = new _Orientation2.default(Math.sqrt(3.0), Math.sqrt(3.0) / 2.0, 0.0, 3.0 / 2.0, Math.sqrt(3.0) / 3.0, -1.0 / 3.0, 0.0, 2.0 / 3.0, 0.5);
  Layout.propTypes = {
    children: _propTypes2.default.node.isRequired,
    className: _propTypes2.default.string,
    draggable: _propTypes2.default.bool,
    flat: _propTypes2.default.bool,
    origin: _propTypes2.default.object,
    size: _propTypes2.default.object,
    spacing: _propTypes2.default.number
  };
  Layout.defaultProps = {
    draggable: true,
    flat: true,
    origin: new _Point2.default(0, 0),
    size: new _Point2.default(10, 10),
    spacing: 1.0
  };
  exports.default = Layout;
});