import React, {Component} from "react";
import PropTypes from "prop-types";
import {View, Text} from "react-native";
import LegendStyle from "../styles/Legend";


class Legend extends Component {

    render() {
        let {style} = this.props;
        return (
            <View style={style.layout}>
                {this.renderLegend()}
            </View>
        )
    }

    renderLegend = () => {
        let {data, style} = this.props;
        let arr = [];
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let legend = data[key];
                arr.push(
                    <View style={{backgroundColor: legend.fill}}>
                        <Text style={style.text}>
                            {legend.label}
                        </Text>
                    </View>)
            }
        }
        return arr;
    };

}

Legend.propTypes = {
    data: PropTypes.array,
    style: LegendStyle
};

Legend.defaultProps = {
    data: Array,
    style: new LegendStyle(),
};


export default Legend;