import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Svg, Circle} from 'react-native-svg';
import AxisX from './AxisX';
import AxisY from './AxisY';
import LabelX from './LabelX';
import LabelY from './LabelY';
import {colorByRand} from '../utils/UColor';
import {maxPointBy, pointBy} from '../utils/UFunc';
import Style from '../styles/ChartStyle';
import {Chart, SH, SW} from './Chart';

// interval x and y axis
const INT_Y = SH / 4;
const INT_X = (SW - 1) / 5;

// color
const FILL = colorByRand();

// max points
let MAX_POINT_Y = 0;
let MAX_POINT_X = 0;

// axis labels
let LABEL_Y;
let LABEL_X;

// axis lines
let AXIS_X;
let AXIS_Y;

let DATA;

const setup = (props) => {
    DATA = props.data;
    MAX_POINT_Y = maxPointBy(DATA, 'y');
    MAX_POINT_X = maxPointBy(DATA, 'x');

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
        />
    );

    AXIS_X = (
        props.axisX &&
        <AxisX
            interval={INT_X}
            lastPoint={SH}
            piece={5}
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

class ScatterChart extends Chart {
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

    circles() {
        return DATA.map((item) => {
            const cx = pointBy(item.x, MAX_POINT_X, SW);
            const cy = pointBy(item.y, MAX_POINT_Y, SH);
            return (
                <Circle
                    key={cx}
                    cx={cx}
                    cy={SH - cy}
                    r={8}
                    fill={FILL}
                />
            );
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
                        {this.circles()}
                        {AXIS_Y}
                        {AXIS_X}
                    </Svg>
                    {LABEL_X}
                </View>
            </View>
        );
    }
}

ScatterChart.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array]),
    meta: PropTypes.oneOfType([PropTypes.array]),
    title: PropTypes.string,
    labelX: PropTypes.boolean,
    labelY: PropTypes.boolean,
    axisX: PropTypes.boolean,
    axisY: PropTypes.boolean,
};

ScatterChart.defaultProps = {
    data: Array,
    meta: Array,
    title: undefined,
    labelX: true,
    labelY: true,
    axisX: true,
    axisY: true,
};

export default ScatterChart;