import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import {map, isEmpty} from 'lodash/fp';
import Style from '../styles/Legend';


function Legend({data}) {
    return (
        <View style={Style.layout}>
            {
                map((legend) => {
                    if (!isEmpty(legend)) {
                        return (
                            <View style={{backgroundColor: legend.fill}}>
                                <Text style={Style.text}>
                                    {legend.label}
                                </Text>
                            </View>
                        );
                    }
                }, data)
            }
        </View>
    );
}

Legend.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array]),
};

Legend.defaultProps = {
    data: Array,
};

export default Legend;