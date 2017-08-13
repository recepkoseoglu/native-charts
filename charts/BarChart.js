import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Svg, Rect} from 'react-native-svg';
import AxisX from './AxisX';
import AxisY from './AxisY';
import LabelX from './LabelX';
import LabelY from './LabelY';
import {colorByIndex} from '../utils/UColor';
import {META_KEY} from '../utils/Naming';
import {maxPointBy, pointBy, itemBy, numbersBy} from '../utils/UFunc';
import Style from '../styles/ChartStyle';
import {Chart, SH, SW} from './Chart';

// interval x and y axis
const INT_Y = SH / 4;
let INT_X = 0;

// max points
let MAX_POINT_Y = 0;

// axis labels
let LABEL_Y;
let LABEL_X;

// axis lines
let AXIS_X;
let AXIS_Y;

let DATA;
let META;

const setup = (props) => {
    DATA = props.data;
    META = props.meta;
    MAX_POINT_Y = maxPointBy(DATA);
    INT_X = (SW - 1) / DATA.length;

    LABEL_Y = (
        props.labelY &&
        <LabelY
            interval={INT_Y}
            maxPoint={MAX_POINT_Y}
        />
    );

    LABEL_X = (
        props.labelX &&
        <LabelX
            interval={INT_X}
            data={DATA}
        />
    );

    AXIS_X = (
        props.axisX &&
        <AxisX
            interval={INT_X}
            lastPoint={SW}
            piece={DATA.length - 1}
        />
    );

    AXIS_Y = (
        props.axisY &&
        <AxisY
            interval={INT_Y}
            lastPoint={SW}
            piece={4}
        />
    );

};

class BarChart extends Chart {
    constructor(props) {
        super(props);
        setup(props);
    }

    componentWillReceiveProps(nextProps) {
        setup(nextProps);
    }

    componentWillUpdate(nextProps) {
        setup(nextProps);
    }

    rectangles() {
        this.legends = [];
        let point = 0;
        return DATA.map((item) => {
            const fieldArray = numbersBy(item);
            let barWidth = INT_X / fieldArray.length;
            barWidth = barWidth < 30 ? barWidth : 30;

            let pointX = point + ((INT_X - (barWidth * fieldArray.length)) / 2);
            point += INT_X;

            return fieldArray.map((child, j) => {
                const metaItem = (itemBy(META, META_KEY, child.key) || {});
                const fill = metaItem.fill || colorByIndex(j);
                this.legends[j] = {fill, label: metaItem.name || child.key};

                const barHeight = pointBy(child.value, MAX_POINT_Y, SH);
                const rect = (
                    <Rect
                        key={child.key}
                        x={pointX}
                        y={SH - barHeight}
                        width={barWidth}
                        height={barHeight}
                        stroke={'white'}
                        strokeWidth={0.5}
                        fill={fill}
                    />
                );
                pointX += barWidth;
                return rect;
            });
        });
    }

    renderBody() {
        return (
            <View style={Style.view}>
                {LABEL_Y}
                <View style={Style.svg}>
                    <Svg
                        width={SW}
                        height={SH}
                    >
                        {this.rectangles()}
                        {AXIS_Y}
                        {AXIS_X}
                    </Svg>
                    {LABEL_X}
                </View>
            </View>
        );
    }
}

BarChart.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array]),
    meta: PropTypes.oneOfType([PropTypes.array]),
    title: PropTypes.string,
    labelX: PropTypes.boolean,
    labelY: PropTypes.boolean,
    axisX: PropTypes.boolean,
    axisY: PropTypes.boolean,
};

BarChart.defaultProps = {
    data: Array,
    meta: Array,
    title: undefined,
    labelX: true,
    labelY: true,
    axisX: true,
    axisY: true,
};

export default BarChart;