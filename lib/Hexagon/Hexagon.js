(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "prop-types", "classnames", "../models/Hex", "../HexUtils", "../Layout"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"), require("prop-types"), require("classnames"), require("../models/Hex"), require("../HexUtils"), require("../Layout"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.React, global.propTypes, global.classnames, global.Hex, global.HexUtils, global.Layout);
    global.Hexagon = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _classnames, _Hex, _HexUtils, _Layout) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _Hex2 = _interopRequireDefault(_Hex);

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

  var HexagonInner = function (_PureComponent) {
    _inherits(HexagonInner, _PureComponent);

    function HexagonInner(props, context) {
      _classCallCheck(this, HexagonInner);

      var _this = _possibleConstructorReturn(this, (HexagonInner.__proto__ || Object.getPrototypeOf(HexagonInner)).call(this, props, context));

      _this.onMouseEnter = function (e) {
        if (_this.props.onMouseEnter) {
          _this.props.onMouseEnter(e, _this);
        }
      };

      _this.onMouseOver = function (e) {
        if (_this.props.onMouseOver) {
          _this.props.onMouseOver(e, _this);
        }
      };

      _this.onMouseLeave = function (e) {
        if (_this.props.onMouseLeave) {
          _this.props.onMouseLeave(e, _this);
        }
      };

      _this.onClick = function (e) {
        if (_this.props.onClick) {
          _this.props.onClick(e, _this);
        }
      };

      _this.onDragStart = function (e) {
        if (_this.props.onDragStart) {
          var targetProps = _extends({}, _this.state, {
            data: _this.props.data,
            fill: _this.props.fill,
            className: _this.props.className
          });
          e.dataTransfer.setData("hexagon", JSON.stringify(targetProps));
          _this.props.onDragStart(e, _this);
        }
      };

      _this.onDragEnd = function (e) {
        if (_this.props.onDragEnd) {
          e.preventDefault();
          var success = e.dataTransfer.dropEffect !== "none";
          _this.props.onDragEnd(e, _this, success);
        }
      };

      _this.onDragOver = function (e) {
        if (_this.props.onDragOver) {
          _this.props.onDragOver(e, _this);
        }
      };

      _this.onDrop = function (e) {
        if (_this.props.onDrop) {
          e.preventDefault();
          var target = JSON.parse(e.dataTransfer.getData("hexagon"));
          _this.props.onDrop(e, _this, target);
        }
      };

      var layout = props.layout,
          q = props.q,
          r = props.r,
          s = props.s;

      var hex = new _Hex2.default(q, r, s);
      var pixel = _HexUtils2.default.hexToPixel(hex, layout);
      _this.state = { pixel: pixel };
      return _this;
    }

    _createClass(HexagonInner, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var _props = this.props,
            layout = _props.layout,
            q = _props.q,
            r = _props.r,
            s = _props.s;
        var prevLayout = prevProps.layout,
            prevQ = prevProps.q,
            prevR = prevProps.r,
            prevS = prevProps.s;

        if (q !== prevQ || r !== prevR || s !== prevS || JSON.stringify(layout) !== JSON.stringify(prevLayout)) {
          var hex = new _Hex2.default(q, r, s);
          var pixel = _HexUtils2.default.hexToPixel(hex, layout);
          this.setState({ hex: hex, pixel: pixel });
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _props2 = this.props,
            attributes = _props2.attributes,
            cellStyle = _props2.cellStyle,
            children = _props2.children,
            className = _props2.className,
            fill = _props2.fill,
            layout = _props2.layout,
            onClick = _props2.onClick,
            onDragEnd = _props2.onDragEnd,
            onDragOver = _props2.onDragOver,
            onDragStart = _props2.onDragStart,
            onDrop = _props2.onDrop,
            onMouseEnter = _props2.onMouseEnter,
            onMouseLeave = _props2.onMouseLeave,
            onMouseOver = _props2.onMouseOver,
            points = _props2.points;
        var pixel = this.state.pixel;

        var fillId = fill ? "url(#" + fill + ")" : null;
        return _react2.default.createElement(
          "g",
          _extends({}, attributes, {
            className: (0, _classnames2.default)("hexagon-group", className),
            transform: "translate(" + pixel.x + ", " + pixel.y + ")",
            draggable: layout.draggable,
            onMouseEnter: onMouseEnter && this.onMouseEnter,
            onMouseOver: onMouseOver && this.onMouseOver,
            onMouseLeave: onMouseLeave && this.onMouseLeave,
            onClick: onClick && this.onClick,
            onDragStart: layout.draggable && onDragStart ? this.onDragStart : null,
            onDragEnd: layout.draggable && onDragEnd ? this.onDragEnd : null,
            onDragOver: layout.draggable && onDragOver ? this.onDragOver : null,
            onDrop: layout.draggable && onDrop ? this.onDrop : null
          }),
          _react2.default.createElement(
            "g",
            { className: "hexagon" },
            _react2.default.createElement("polygon", { points: points, fill: fillId, style: cellStyle }),
            children
          )
        );
      }
    }]);

    return HexagonInner;
  }(_react.PureComponent);

  HexagonInner.propTypes = {
    attributes: _propTypes2.default.object,
    q: _propTypes2.default.number.isRequired,
    r: _propTypes2.default.number.isRequired,
    s: _propTypes2.default.number.isRequired,
    fill: _propTypes2.default.string,
    cellStyle: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
    className: _propTypes2.default.string,
    data: _propTypes2.default.object,
    onMouseEnter: _propTypes2.default.func,
    onMouseOver: _propTypes2.default.func,
    onMouseLeave: _propTypes2.default.func,
    onClick: _propTypes2.default.func,
    onDragStart: _propTypes2.default.func,
    onDragEnd: _propTypes2.default.func,
    onDragOver: _propTypes2.default.func,
    onDrop: _propTypes2.default.func,
    children: _propTypes2.default.node,
    points: _propTypes2.default.string,
    layout: _propTypes2.default.object
  };

  var Hexagon = function (_PureComponent2) {
    _inherits(Hexagon, _PureComponent2);

    function Hexagon() {
      _classCallCheck(this, Hexagon);

      return _possibleConstructorReturn(this, (Hexagon.__proto__ || Object.getPrototypeOf(Hexagon)).apply(this, arguments));
    }

    _createClass(Hexagon, [{
      key: "render",
      value: function render() {
        var _this3 = this;

        return _react2.default.createElement(
          _Layout.LayoutContext.Consumer,
          null,
          function (_ref) {
            var layout = _ref.layout,
                points = _ref.points;
            return _react2.default.createElement(HexagonInner, _extends({}, _this3.props, { layout: layout, points: points }));
          }
        );
      }
    }]);

    return Hexagon;
  }(_react.PureComponent);

  exports.default = Hexagon;
});