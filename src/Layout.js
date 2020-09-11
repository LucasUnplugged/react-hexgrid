import React, { PureComponent, createContext } from "react";
import PropTypes from "prop-types";
import Orientation from "./models/Orientation";
import Point from "./models/Point";

export const LayoutContext = createContext({});
LayoutContext.displayName = "HexGridLayout";

class Layout extends PureComponent {
  static LAYOUT_FLAT = new Orientation(
    3.0 / 2.0,
    0.0,
    Math.sqrt(3.0) / 2.0,
    Math.sqrt(3.0),
    2.0 / 3.0,
    0.0,
    -1.0 / 3.0,
    Math.sqrt(3.0) / 3.0,
    0.0
  );
  static LAYOUT_POINTY = new Orientation(
    Math.sqrt(3.0),
    Math.sqrt(3.0) / 2.0,
    0.0,
    3.0 / 2.0,
    Math.sqrt(3.0) / 3.0,
    -1.0 / 3.0,
    0.0,
    2.0 / 3.0,
    0.5
  );

  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    draggable: PropTypes.bool,
    flat: PropTypes.bool,
    origin: PropTypes.object,
    size: PropTypes.object,
    spacing: PropTypes.number,
  };

  static defaultProps = {
    draggable: true,
    flat: true,
    origin: new Point(0, 0),
    size: new Point(10, 10),
    spacing: 1.0,
  };

  getContextValue = () => {
    // Strips `children` and `className` from our layout context value
    const { children, className, flat, ...rest } = this.props;
    const orientation = flat ? Layout.LAYOUT_FLAT : Layout.LAYOUT_POINTY;
    const cornerCoords = this.calculateCoordinates(orientation);
    const points = cornerCoords
      .map((point) => `${point.x},${point.y}`)
      .join(" ");
    const childLayout = Object.assign({}, rest, { orientation });
    return {
      layout: childLayout,
      points,
    };
  };

  getPointOffset(corner, orientation, size) {
    let angle = (2.0 * Math.PI * (corner + orientation.startAngle)) / 6;
    return new Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
  }

  // TODO Refactor
  calculateCoordinates(orientation) {
    const corners = [];
    const center = new Point(0, 0);
    const { size } = this.props;

    Array.from(new Array(6), (x, i) => {
      const offset = this.getPointOffset(i, orientation, size);
      const point = new Point(center.x + offset.x, center.y + offset.y);
      corners.push(point);
    });

    return corners;
  }

  render() {
    const { children, className } = this.props;
    return (
      <LayoutContext.Provider value={this.getContextValue()}>
        <g className={className}>{children}</g>
      </LayoutContext.Provider>
    );
  }
}

export default Layout;
