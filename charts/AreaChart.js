import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Svg, Polygon} from 'react-native-svg';
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
    INT_X = (SW - 1) / (DATA.length - 1);
    MAX_POINT_Y = maxPointBy(DATA);

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

class AreaChart extends Chart {
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

    polygons() {
        this.legends = [];
        let startPoint = 0;
        return DATA.map((item, i) => {
            const nextItem = (i < DATA.length) && DATA[i + 1];

            const polygons = numbersBy(item).map((child, j) => {
                const metaItem = (itemBy(META, META_KEY, child.key) || {});
                const fill = metaItem.fill || colorByIndex(j);
                const lastValue = nextItem ? nextItem[child.key] : child.value;
                this.legends[j] = {fill, label: metaItem.name || child.key};

                const point = pointBy(child.value, MAX_POINT_Y, SH);
                const lastPoint = pointBy(lastValue, MAX_POINT_Y, SH);
                const points = `${startPoint} ${SH},${startPoint + INT_X} ${SH},${startPoint + INT_X} ${SH - lastPoint},${startPoint} ${SH - point}`;

                return (
                    <Polygon
                        key={child.key}
                        fillOpacity={0.7}
                        fill={fill}
                        points={points}
                    />
                );
            });

            startPoint += INT_X;
            return (polygons);
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
                        {this.polygons()}
                        {AXIS_Y}
                        {AXIS_X}
                    </Svg>
                    {LABEL_X}
                </View>
            </View>
        );
    }
}

AreaChart.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array]),
    meta: PropTypes.oneOfType([PropTypes.array]),
    title: PropTypes.string,
    labelX: PropTypes.boolean,
    labelY: PropTypes.boolean,
    axisX: PropTypes.boolean,
    axisY: PropTypes.boolean,
};

AreaChart.defaultProps = {
    data: Array,
    meta: Array,
    title: undefined,
    labelX: true,
    labelY: true,
    axisX: true,
    axisY: true,
};

export default AreaChart;