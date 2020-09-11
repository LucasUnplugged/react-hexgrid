import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Hex from "../models/Hex";
import HexUtils from "../HexUtils";
import { LayoutContext } from "../Layout";

class HexagonInner extends PureComponent {
  static propTypes = {
    attributes: PropTypes.object,
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
    points: PropTypes.string,
    layout: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    const { layout, q, r, s } = props;
    const hex = new Hex(q, r, s);
    const pixel = HexUtils.hexToPixel(hex, layout);
    this.state = { pixel };
  }

  componentDidUpdate(prevProps) {
    const { layout, q, r, s } = this.props;
    const { layout: prevLayout, q: prevQ, r: prevR, s: prevS } = prevProps;
    if (
      q !== prevQ ||
      r !== prevR ||
      s !== prevS ||
      JSON.stringify(layout) !== JSON.stringify(prevLayout)
    ) {
      const hex = new Hex(q, r, s);
      const pixel = HexUtils.hexToPixel(hex, layout);
      this.setState({ hex, pixel });
    }
  }
  onMouseEnter = (e) => {
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e, this);
    }
  };
  onMouseOver = (e) => {
    if (this.props.onMouseOver) {
      this.props.onMouseOver(e, this);
    }
  };
  onMouseLeave = (e) => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e, this);
    }
  };
  onClick = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e, this);
    }
  };
  onDragStart = (e) => {
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
  };
  onDragEnd = (e) => {
    if (this.props.onDragEnd) {
      e.preventDefault();
      const success = e.dataTransfer.dropEffect !== "none";
      this.props.onDragEnd(e, this, success);
    }
  };
  onDragOver = (e) => {
    if (this.props.onDragOver) {
      this.props.onDragOver(e, this);
    }
  };
  onDrop = (e) => {
    if (this.props.onDrop) {
      e.preventDefault();
      const target = JSON.parse(e.dataTransfer.getData("hexagon"));
      this.props.onDrop(e, this, target);
    }
  };
  render() {
    const {
      attributes,
      cellStyle,
      children,
      className,
      fill,
      layout,
      onClick,
      onDragEnd,
      onDragOver,
      onDragStart,
      onDrop,
      onMouseEnter,
      onMouseLeave,
      onMouseOver,
      points,
    } = this.props;
    const { pixel } = this.state;
    const fillId = fill ? `url(#${fill})` : null;
    return (
      <g
        {...attributes}
        className={classNames("hexagon-group", className)}
        transform={`translate(${pixel.x}, ${pixel.y})`}
        draggable={layout.draggable}
        onMouseEnter={onMouseEnter && this.onMouseEnter}
        onMouseOver={onMouseOver && this.onMouseOver}
        onMouseLeave={onMouseLeave && this.onMouseLeave}
        onClick={onClick && this.onClick}
        onDragStart={layout.draggable && onDragStart ? this.onDragStart : null}
        onDragEnd={layout.draggable && onDragEnd ? this.onDragEnd : null}
        onDragOver={layout.draggable && onDragOver ? this.onDragOver : null}
        onDrop={layout.draggable && onDrop ? this.onDrop : null}
      >
        <g className="hexagon">
          <polygon points={points} fill={fillId} style={cellStyle} />
          {children}
        </g>
      </g>
    );
  }
}

class Hexagon extends PureComponent {
  render() {
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
