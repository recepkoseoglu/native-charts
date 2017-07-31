import React, {Component} from "react";
import PropTypes from "prop-types";
import {Dimensions, View, Text,} from "react-native";
import Arrays from "../utils/Arrays";
import {Svg, Circle, Line} from "react-native-svg";
import ScatterChartStyle from "../styles/ScatterChartStyle";
import Legend from "./Legend";



class ScatterChart extends Component {

    render() {
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
                                {this.renderScatters(data, meta)}
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

    renderScatters(data, meta) {
        let metaArr = [];
        for (let i in data) {
            let item = data[i];
            for (let j in item.data) {
                let child = item.data[j],
                    cx = this.pointX(child.x),
                    cy = this.pointY(child.y),
                    fill = item.fill || this.randColor(parseInt(i)),
                    fields = this.getFields(item.data[j]);

                for (let f in fields) {
                    let key = fields[f].key,
                        properties = Arrays.getValueByKey(meta, "dataKey", key);
                    properties = properties === undefined ? {} : properties;
                }
                this.legends[i] = {fill: fill, label: item.name};
                metaArr.push(
                    <Circle
                        key={i + " " + j}
                        cx={cx}
                        cy={cy}
                        r={8}
                        fill={fill}/>);

            }
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
        let {width, height} = this.props;
        let xWidth = (width - 1) / 5;
        let result = [];
        for (let i = 0; i < 5; i++) {
            result.push(
                <Line key={i}
                      x1={`${(i + 1) * xWidth}`}
                      y1="0"
                      x2={`${(i + 1) * xWidth}`}
                      y2={`${height}`}
                      stroke="#333"
                      strokeWidth="0.1"
                      strokeDasharray={[5, 10]}/>);
        }
        return result;
    }

    renderYAxisLabel() {
        let {height, style} = this.props;
        let max = this.maxAxis();
        let result = [];
        for (let i = 0; i < 4; i++) {
            let id = parseInt(`${(max.y / 4) * (4 - i)}`);
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
        let {style, width} = this.props;
        let max = this.maxAxis();
        let axisArr = [];
        for (let i = 0; i < 5; i++) {
            axisArr.push(
                <View style={{width: width / 5}}>
                    <Text style={style.xAxisText}>
                        {(max.x / 5) * (i + 1)}
                    </Text>
                </View>);
        }
        return axisArr;
    }

    maxAxis() {
        let {data} = this.props;
        let maxYAxis = 0;
        let maxXAxis = 0;
        for (let i in data) {
            let item = data[i];
            for (let j in item.data) {
                let fields = this.getFields(item.data[j]);
                for (let f in fields) {
                    if (fields[f].key === "x" && fields[f].value > maxXAxis)
                        maxXAxis = fields[f].value;
                    if (fields[f].key === "y" && fields[f].value > maxYAxis)
                        maxYAxis = fields[f].value;
                }
            }
        }
        let x = maxXAxis > 1000 ? 1000 : maxXAxis > 100 ? 100 : maxXAxis > 40 ? 40 : maxXAxis > 10 ? 10 : 1;
        let y = maxYAxis > 1000 ? 1000 : maxYAxis > 100 ? 100 : maxYAxis > 50 ? 50 : maxYAxis > 10 ? 10 : 1;

        let max = {
            x: (~~((maxXAxis + x - 1) / x) * x),
            y: (~~((maxYAxis + y - 1) / y) * y)
        };

        return max;
    }

    pointY(value) {
        let max = this.maxAxis();
        return this.props.height - ((this.props.height * ((value * 100) / max.y)) / 100);
    }

    pointX(value) {
        let max = this.maxAxis();
        return ((this.props.width * ((value * 100) / max.x)) / 100);
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

ScatterChart.propTypes = {
    data: PropTypes.array,
    meta: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
    style: ScatterChartStyle
};

ScatterChart.defaultProps = {
    data: Array,
    style: new ScatterChartStyle(),
    width: width - 75,
    height: 200
};

export default ScatterChart;