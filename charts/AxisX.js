import React from 'react';
import PropTypes from 'prop-types';
import {Line, G} from 'react-native-svg';

function AxisX({interval, piece, lastPoint}) {
    const result = [];
    for (let i = 0; i < piece; i += 1) {
        result.push(
            <Line
                key={i}
                x1={`${(i + 1) * interval}`}
                y1="0"
                x2={`${(i + 1) * interval}`}
                y2={`${lastPoint}`}
                stroke="#333"
                strokeWidth="0.1"
                strokeDasharray={[5, 10]}
            />);
    }
    return <G>{result}</G>;
}

AxisX.propTypes = {
    interval: PropTypes.number,
    piece: PropTypes.number,
    lastPoint: PropTypes.number,
};

AxisX.defaultProps = {
    interval: 0,
    piece: 0,
    lastPoint: 0,
};

export default AxisX;