import React from 'react';
import PropTypes from 'prop-types';
import {Line, G} from 'react-native-svg';

function AxisY({interval, piece, lastPoint}) {
    const result = [];
    for (let i = 0; i < piece; i += 1) {
        result.push(
            <Line
                key={i}
                x1="0"
                y1={`${(i + 1) * interval}`}
                x2={`${lastPoint}`}
                y2={`${(i + 1) * interval}`}
                stroke="#333"
                strokeWidth="0.1"
                strokeDasharray={[5, 10]}
            />);
    }
    return <G>{result}</G>;
}

AxisY.propTypes = {
    interval: PropTypes.number,
    piece: PropTypes.number,
    lastPoint: PropTypes.number,
};

AxisY.defaultProps = {
    interval: 0,
    piece: 0,
    lastPoint: 0,
};

export default AxisY;