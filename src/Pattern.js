import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import HexUtils from "./HexUtils";
import Point from "./models/Point";

class Pattern extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    size: PropTypes.object,
  };
  static defaultProps = {
    size: new Point(10, 10),
  };

  render() {
    const { id, link, size } = this.props;

    return (
      <defs>
        <pattern
          id={id}
          patternUnits="userSpaceOnUse"
          x={-1 * size.x}
          y={-1 * size.y}
          width={2 * size.x}
          height={2 * size.y}
        >
          <image
            xlinkHref={link}
            x={0}
            y={0}
            width={2 * size.x}
            height={2 * size.y}
          />
        </pattern>
      </defs>
    );
  }
}

export default Pattern;
