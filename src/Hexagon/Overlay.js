import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { LayoutContext } from "../Layout";

class OverlayInner extends PureComponent {
  render() {
    const { attributes, children, className, fill, points, style } = this.props;
    return (
      <g {...attributes} className={className}>
        <polygon
          points={points}
          style={style}
          fill={fill ? `url(#${fill})` : null}
        />
        {children}
      </g>
    );
  }
}

OverlayInner.propTypes = {
  attributes: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
  fill: PropTypes.string,
  points: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

OverlayInner.defaultProps = {
  className: "hexagon-overlay",
};

class Overlay extends PureComponent {
  render() {
    return (
      <LayoutContext.Consumer>
        {({ points }) => <OverlayInner {...this.props} points={points} />}
      </LayoutContext.Consumer>
    );
  }
}

export default Overlay;
