import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import HexUtils from "./HexUtils";
import { LayoutContext } from "./Layout";

class PathInner extends PureComponent {
  static propTypes = {
    end: PropTypes.object,
    layout: PropTypes.object,
    path: PropTypes.array,
    start: PropTypes.object,
  };

  // TODO Refactor
  getPoints() {
    const { layout, path, start, end } = this.props;
    let intersects = path || [];

    if (!path) {
      // Get all the intersecting hexes between start and end points
      let distance = HexUtils.distance(start, end);
      let step = 1.0 / Math.max(distance, 1);
      for (let i = 0; i <= distance; i++) {
        intersects.push(HexUtils.round(HexUtils.hexLerp(start, end, step * i)));
      }
    }

    // Construct Path points out of all the intersecting hexes (e.g. M 0,0 L 10,20, L 30,20)
    let points = "M";
    points += intersects
      .map((hex) => {
        let p = HexUtils.hexToPixel(hex, layout);
        return ` ${p.x},${p.y} `;
      })
      .join("L");

    return points;
  }

  render() {
    const { path, start, end } = this.props;

    const isEmptyPath = !!path && !path.length;
    const isPointMissing = !path && (!start || !end);
    if (isEmptyPath || isPointMissing) {
      return null;
    }
    return <path d={this.getPoints()}></path>;
  }
}

class Path extends PureComponent {
  render() {
    return (
      <LayoutContext.Consumer>
        {({ layout }) => <PathInner {...this.props} layout={layout} />}
      </LayoutContext.Consumer>
    );
  }
}

export default Path;
