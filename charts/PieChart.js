import React, {Component} from "react";
import PropTypes from "prop-types";
import {Dimensions, View} from "react-native";
import {Svg, Circle, Path} from "react-native-svg";
import PieChartStyle from "../styles/PieChartStyle";
import Legend from "./Legend";


class PieChart extends Component {

    render() {
        this.legends = [];
        let {size, data} = this.props;
        let depth = this.depthTree(data);

        let c = 2 * depth + 1;
        let mRadius = (((size - 1) / 2) / c) * ( c - depth - 1);

        let root = depth > 1 ?
            (<Circle
                fill="white"
                cx={size / 2}
                cy={size / 2}
                r={mRadius}/>) :
            undefined;

        return (
            <View style={{width: size}}>
                <Svg height={size} width={size}>
                    {this.renderPies(data, 360, 0, depth, depth - 1)}
                    {root}
                </Svg>
                <Legend data={this.legends}/>
            </View>
        )
    }

    renderPies(data, percentage, rotation, depth, depthIndex) {
        if (!data || data.length <= 0) {
            return [];
        }
        let piesArr = [],
            sumValues = this.sumValues(data),
            mRotation = rotation;

        let c = 2 * depth + 1;
        let mRadius = (((this.props.size - 1) / 2) / c) * ( c - depthIndex);

        data.map(function (item: DataProps) {
            let mPercentage = (percentage * item.value) / sumValues;
            piesArr.push.apply(piesArr, this.renderPies(item.children, mPercentage, mRotation, depth, depthIndex - 1));
            mRotation += mPercentage;
        }.bind(this));

        piesArr.push.apply(piesArr, this.createPath(data, mRadius, percentage, rotation, depth, depthIndex));
        return piesArr;
    }

    createPath(data, radius, percentage, rotaion, depth, depthIndex) {
        let sectors = [],
            mRadius = radius,
            origin = this.props.size / 2,
            mRotation = rotaion,
            max = this.sumValues(data);

        data.map(function (item, key) {
            let value = item.value,
                mPercentage = (percentage * value) / max,
                isCircle = max === value,
                aCalc = ( mPercentage > 180 ) ? 360 - mPercentage : mPercentage,
                aRad = aCalc * Math.PI / 180,
                z = Math.sqrt(2 * mRadius * mRadius - ( 2 * mRadius * mRadius * Math.cos(aRad) )),
                x = aCalc <= 90 ? mRadius * Math.sin(aRad) : mRadius * Math.sin((180 - aCalc) * Math.PI / 180),
                y = Math.sqrt(z * z - x * x),
                Y = (origin - mRadius) + y,
                X = mPercentage <= 180 ? origin + x : origin - x,
                arcSweep = mPercentage <= 180 ? 0 : 1,
                V = origin - mRadius,
                fill = item.fill || this.randColor(key + z);

            item.fill = fill;
            if (depthIndex === (depth - 1)) {
                this.legends[item.key || item.label] = {fill: fill, label: item.label};
            }
            if (isCircle) {
                sectors.push(
                    <Circle
                        key={item.key}
                        fill={fill}
                        cx={origin}
                        cy={origin}
                        r={radius}/>);
            }
            else {
                sectors.push(
                    <Path
                        key={item.key}
                        origin={origin + ', ' + origin}
                        rotate={mRotation}
                        d={'M ' + origin + ' ' + origin + ' V ' + V + ' A ' + mRadius + ' ' + mRadius + ' 1 ' + arcSweep + ' 1 ' + X + '  ' + Y + " z"}
                        strokeWidth="0.5"
                        stroke="#fff"
                        strokeOpacity={0.5}
                        fill={fill}>
                    </Path>);
            }
            mRotation = mRotation + mPercentage;
        }.bind(this));
        return sectors
    }

    depthTree(data) {
        if (!data || data.length <= 0) {
            return 0;
        }
        let depth = 0;
        for (let i = 0; i < data.length; i++) {
            depth = Math.max(depth, this.depthTree(data[i].children));
        }
        return 1 + depth;
    }

    sumValues(data) {
        let max = 0;
        data.map(function (item) {
            let value = item.value;
            max += value;
        });
        return max;
    }


    randColor(index) {
        let colors = ["#F44336", "#2196F3", "#E91E63", "#00BCD4", "#673AB7", "#009688", "#3F51B5", "#4CAF50", "#FF9800", "#FF5722", "#FFC107"];
        if (index !== undefined) {
            return colors[parseInt(`${Math.abs(index % colors.length)}`) % (colors.length)];
        }
        return colors[Math.floor(Math.random() * (colors.length - 1))];
    }
}

const {width} = Dimensions.get("window");

PieChart.propTypes = {
    data: PropTypes.array,
    size: PropTypes.number,
    style: PieChartStyle
};

PieChart.defaultProps = {
    data: Array,
    style: new PieChartStyle(),
    size: width
};

export default PieChart;
