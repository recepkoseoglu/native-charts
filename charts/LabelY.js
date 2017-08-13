import React from 'react';
import PropTypes from 'prop-types';
import Style from '../styles/LabelStyle';
import {map} from 'lodash/fp';
import {View, Text} from 'react-native';

function LabelY({interval, maxPoint}) {
    const result = [];
    for (let i = 0; i < 4; i += 1) {
        result.push(
            <View
                key={i}
                style={{height: interval}}
            >
                <Text style={Style.text}>
                    {parseInt(`${(maxPoint / 4) * (4 - i)}`, 10)}
                </Text>
            </View>);
    }
    return (
        <View style={Style.yLabel}>
            {result}
        </View>
    );
}

LabelY.propTypes = {
    maxPoint: PropTypes.number,
    interval: PropTypes.number,
};

LabelY.defaultProps = {
    maxPoint: 0,
    interval: 0,
};

export default LabelY;