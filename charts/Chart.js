import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dimensions, View, Text} from 'react-native';
import Legend from './Legend';
import Style from '../styles/ChartStyle';

const WINDOW = Dimensions.get('window');
const SH = 200;
const SW = WINDOW.width - 120;

class Chart extends Component {
    renderBody() {
        return <View/>;
    }

    render() {
        const {title} = this.props;
        return (
            <View style={Style.layout}>
                <View>
                    <Text style={Style.title}>{title}</Text>
                    {this.renderBody()}
                    <Legend data={this.legends}/>
                </View>
            </View>
        );
    }
}

Chart.propTypes = {
    title: PropTypes.string,
};

Chart.defaultProps = {
    title: undefined,
};

export {
    Chart,
    SW,
    SH,
};

export default Chart;