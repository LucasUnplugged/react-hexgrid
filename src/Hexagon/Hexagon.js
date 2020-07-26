import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Hex from "../models/Hex";
import HexUtils from "../HexUtils";
import { LayoutContext } from "../Layout";
{
  /* <LayoutContext.Consumer></LayoutContext.Consumer> */
}

class HexagonInner extends Component {
  static propTypes = {
    q: PropTypes.number.isRequired,
    r: PropTypes.number.isRequired,
    s: PropTypes.number.isRequired,
    fill: PropTypes.string,
    cellStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    className: PropTypes.string,
    data: PropTypes.object,
    onMouseEnter: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func,
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDragOver: PropTypes.func,
    onDrop: PropTypes.func,
    children: PropTypes.node,
  };

  constructor(props, context) {
    super(props, context);
    const { layout, q, r, s } = props;
    const hex = new Hex(q, r, s);
    const pixel = HexUtils.hexToPixel(hex, layout);
    this.state = { hex, pixel };
  }

  // TODO Refactor to reduce duplicate
  componentWillReceiveProps(nextProps) {
    const { layout, q, r, s } = nextProps;
    const hex = new Hex(q, r, s);
    const pixel = HexUtils.hexToPixel(hex, layout);
    this.setState({ hex, pixel });
  }
  onMouseEnter(e) {
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e, this);
    }
  }
  onMouseOver(e) {
    if (this.props.onMouseOver) {
      this.props.onMouseOver(e, this);
    }
  }
  onMouseLeave(e) {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e, this);
    }
  }
  onClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e, this);
    }
  }
  onDragStart(e) {
    if (this.props.onDragStart) {
      const targetProps = {
        ...this.state,
        data: this.props.data,
        fill: this.props.fill,
        className: this.props.className,
      };
      e.dataTransfer.setData("hexagon", JSON.stringify(targetProps));
      this.props.onDragStart(e, this);
    }
  }
  onDragEnd(e) {
    if (this.props.onDragEnd) {
      e.preventDefault();
      const success = e.dataTransfer.dropEffect !== "none";
      this.props.onDragEnd(e, this, success);
    }
  }
  onDragOver(e) {
    if (this.props.onDragOver) {
      this.props.onDragOver(e, this);
    }
  }
  onDrop(e) {
    if (this.props.onDrop) {
      e.preventDefault();
      const target = JSON.parse(e.dataTransfer.getData("hexagon"));
      this.props.onDrop(e, this, target);
    }
  }
  render() {
    const { fill, cellStyle, className, points } = this.props;
    const { hex, pixel } = this.state;
    const fillId = fill ? `url(#${fill})` : null;
    return (
      <g
        className={classNames("hexagon-group", className)}
        transform={`translate(${pixel.x}, ${pixel.y})`}
        draggable="true"
        onMouseEnter={(e) => this.onMouseEnter(e)}
        onMouseOver={(e) => this.onMouseOver(e)}
        onMouseLeave={(e) => this.onMouseLeave(e)}
        onClick={(e) => this.onClick(e)}
        onDragStart={(e) => this.onDragStart(e)}
        onDragEnd={(e) => this.onDragEnd(e)}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => this.onDrop(e)}
      >
        <g className="hexagon">
          <polygon points={points} fill={fillId} style={cellStyle} />
          {this.props.children}
        </g>
      </g>
    );
  }
}

class Hexagon extends Component {
  render() {
    console.warn("this.props", this.props);
    return (
      <LayoutContext.Consumer>
        {({ layout, points }) => (
          <HexagonInner {...this.props} layout={layout} points={points} />
        )}
      </LayoutContext.Consumer>
    );
  }
}

export default Hexagon;
