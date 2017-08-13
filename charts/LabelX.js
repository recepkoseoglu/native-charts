import React from 'react';
import PropTypes from 'prop-types';
import Style from '../styles/LabelStyle';
import {map} from 'lodash/fp';
import {View, Text} from 'react-native';

function LabelX({interval, data}) {
    return (
        <View style={Style.xLabel}>
            {
                map(item =>
                    (
                        <View style={{width: interval}}>
                            <Text style={Style.text}>
                                {item.name}
                            </Text>
                        </View>
                    ), data)
            }
        </View>
    );
}

LabelX.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array]),
    interval: PropTypes.number,
};

LabelX.defaultProps = {
    data: Array,
    interval: 0,
};

export default LabelX;