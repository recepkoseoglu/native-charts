import React, {Component} from "react";
import PropTypes from "prop-types";
import {Dimensions, View, Text} from "react-native";
import {Svg, G, Line, Rect} from "react-native-svg";
import BarChartStyle from "../styles/BarChartStyle";
import Arrays from "../utils/Arrays";
import Legend from "./Legend";

class BarChart extends Component {

    render(){
        this.legends = [];
        let {style, width, height, data, meta} = this.props;
        return (
            <View>
                <View style={style.viewLayout}>
                    <View style={style.yAxisLayout}>
                        {this.renderYAxisLabel()}
                    </View>
                    <View>
                        <View style={style.svgLayout}>
                            <Svg width={width} height={height}>
                                {this.renderBars(data, meta)}
                                {this.renderYAxis()}
                                {this.renderXAxis()}
                            </Svg>
                        </View>
                        <View style={style.xAxisLayout}>
                            {this.renderXAxisLabel()}
                        </View>
                    </View>
                </View>
                <Legend data={this.legends}/>
            </View>
        )
    }

    renderBars(data, meta) {
        let metaArr = [];
        let xAxisWidth = this.xAxisWidth();
        let sumXAxisWidth = 0;

        for (let i in data) {
            let item = data[i];
            let itemArr = [];

            let barWidth = this.barWidth(item);
            let fields = this.getFields(item);
            let pointX = sumXAxisWidth + ((xAxisWidth - (barWidth * fields.length)) / 2);
            sumXAxisWidth += xAxisWidth;

            for (let j in fields) {
                let key = fields[j].key,
                    value = fields[j].value;

                let properties = Arrays.getValueByKey(meta, "dataKey", key);
                properties = properties === undefined ? {} : properties;

                let fill = properties.fill || this.randColor(parseInt(j));
                let barHeight = this.barHeight(value);
                this.legends[properties.name || key] = {fill: fill, label: properties.name || key};

                itemArr.push(
                    <Rect
                        key={key}
                        x={pointX}
                        y={0}
                        width={barWidth}
                        height={barHeight}
                        fill={fill}/>);

                pointX += barWidth;
            }
            metaArr.push(
                <G key={i}>
                    {itemArr}
                </G>)
        }
        return metaArr;
    }

    renderYAxis() {
        let {width, height} = this.props;
        let axisArr = [];
        for (let i = 0; i < 4; i++) {
            axisArr.push(
                <Line key={i}
                      x1="0"
                      y1={`${(i + 1) * (height / 4)}`}
                      x2={`${width}`}
                      y2={`${(i + 1) * (height / 4)}`}
                      stroke="#333"
                      strokeWidth="0.1"
                      strokeDasharray={[5, 10]}/>);
        }
        return axisArr;
    }

    renderXAxis() {
        let {width, data} = this.props;
        let xWidth = this.xAxisWidth();
        let result = [];
        for (let i = 0; i < data.length; i++) {
            result.push(
                <Line key={i}
                      x1={`${(i + 1) * xWidth}`}
                      y1="0"
                      x2={`${(i + 1) * xWidth}`}
                      y2={`${width}`}
                      stroke="#333"
                      strokeWidth="0.1"
                      strokeDasharray={[5, 10]}/>);
        }
        return result;
    }

    renderYAxisLabel() {
        let {height, style} = this.props;
        let maxYAxis = this.maxYAxis();
        let result = [];
        for (let i = 0; i < 4; i++) {
            let id = parseInt(`${(maxYAxis / 4) * (4 - i)}`);
            result.push(
                <View style={{height: (height / 4)}}>
                    <Text style={style.xAxisText}>
                        {id}
                    </Text>
                </View>);
        }
        return result;
    }

    renderXAxisLabel() {
        let {style, data} = this.props;
        let width = this.xAxisWidth();
        let axisArr = [];
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            axisArr.push(
                <View style={{width}}>
                    <Text style={style.xAxisText}>
                        {item.name}
                    </Text>
                </View>);
        }
        return axisArr;
    }

    barWidth(data) {
        let fields = this.getFields(data),
            minWidth = this.xAxisWidth() / fields.length;
        return minWidth < 30 ? minWidth : 30;
    }

    barHeight(value) {
        let {height} = this.props;
        let maxYAxis = this.maxYAxis();
        return ((height * ((value * 100) / maxYAxis)) / 100);
    }

    maxYAxis() {
        let {data} = this.props;
        let maxYAxis = 0;
        for (let i in data) {
            let fields = this.getFields(data[i]);
            for (let j in fields) {
                if (fields[j].value > maxYAxis) {
                    maxYAxis = fields[j].value;
                }
            }
        }
        let a = maxYAxis > 1000 ? 1000 : maxYAxis > 100 ? 100 : maxYAxis > 50 ? 50 : maxYAxis > 10 ? 10 : 1;

        return (~~((maxYAxis + a - 1) / a) * a);
    }

    xAxisWidth() {
        let {width, data} = this.props;
        return (width - 1) / (data.length);
    }

    getFields(data) {
        let arr = [];
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                if (key === "name" || key === "fill" || key === "unit") {
                    continue;
                }
                arr.push({
                    value: data[key],
                    key: key
                });
            }
        }
        return arr;
    }

    randColor(index) {
        let colors = ["#F44336", "#673AB7", "#2196F3", "#FF5722", "#9C27B0", "#FFC107", "#FF9800", "#4CAF50", "#00796B", "#009688", "#3F51B5"];
        if (index !== undefined) {
            return colors[index % colors.length];
        }
        else {
            return colors[Math.floor(Math.random() * (colors.length - 1))];
        }
    }

}

const {width} = Dimensions.get("window");

BarChart.propTypes = {
    data: PropTypes.array,
    meta: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
    style: BarChartStyle
};

BarChart.defaultProps = {
    data: Array,
    style: new BarChartStyle(),
    width: width - 75,
    height: 200
};

export default BarChart;