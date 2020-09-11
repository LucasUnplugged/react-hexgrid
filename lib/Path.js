(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "prop-types", "./HexUtils", "./Layout"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"), require("prop-types"), require("./HexUtils"), require("./Layout"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.React, global.propTypes, global.HexUtils, global.Layout);
    global.Path = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _HexUtils, _Layout) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _HexUtils2 = _interopRequireDefault(_HexUtils);

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

  var PathInner = function (_PureComponent) {
    _inherits(PathInner, _PureComponent);

    function PathInner() {
      _classCallCheck(this, PathInner);

      return _possibleConstructorReturn(this, (PathInner.__proto__ || Object.getPrototypeOf(PathInner)).apply(this, arguments));
    }

    _createClass(PathInner, [{
      key: "getPoints",
      value: function getPoints() {
        var _props = this.props,
            layout = _props.layout,
            path = _props.path,
            start = _props.start,
            end = _props.end;

        var intersects = path || [];

        if (!path) {
          // Get all the intersecting hexes between start and end points
          var distance = _HexUtils2.default.distance(start, end);
          var step = 1.0 / Math.max(distance, 1);
          for (var i = 0; i <= distance; i++) {
            intersects.push(_HexUtils2.default.round(_HexUtils2.default.hexLerp(start, end, step * i)));
          }
        }

        // Construct Path points out of all the intersecting hexes (e.g. M 0,0 L 10,20, L 30,20)
        var points = "M";
        points += intersects.map(function (hex) {
          var p = _HexUtils2.default.hexToPixel(hex, layout);
          return " " + p.x + "," + p.y + " ";
        }).join("L");

        return points;
      }
    }, {
      key: "render",
      value: function render() {
        var _props2 = this.props,
            path = _props2.path,
            start = _props2.start,
            end = _props2.end;


        var isEmptyPath = !!path && !path.length;
        var isPointMissing = !path && (!start || !end);
        if (isEmptyPath || isPointMissing) {
          return null;
        }
        return _react2.default.createElement("path", { d: this.getPoints() });
      }
    }]);

    return PathInner;
  }(_react.PureComponent);

  PathInner.propTypes = {
    end: _propTypes2.default.object,
    layout: _propTypes2.default.object,
    path: _propTypes2.default.array,
    start: _propTypes2.default.object
  };

  var Path = function (_PureComponent2) {
    _inherits(Path, _PureComponent2);

    function Path() {
      _classCallCheck(this, Path);

      return _possibleConstructorReturn(this, (Path.__proto__ || Object.getPrototypeOf(Path)).apply(this, arguments));
    }

    _createClass(Path, [{
      key: "render",
      value: function render() {
        var _this3 = this;

        return _react2.default.createElement(
          _Layout.LayoutContext.Consumer,
          null,
          function (_ref) {
            var layout = _ref.layout;
            return _react2.default.createElement(PathInner, _extends({}, _this3.props, { layout: layout }));
          }
        );
      }
    }]);

    return Path;
  }(_react.PureComponent);

  exports.default = Path;
});