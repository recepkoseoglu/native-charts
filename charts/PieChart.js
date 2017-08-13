import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Svg, Path, Circle} from 'react-native-svg';
import {colorByIndex} from '../utils/UColor';
import {depthTree, radiusBy, pointZBy, pointXBy, pointYBy, calcBy, radBy} from '../utils/UFunc';
import {sumBy, concat} from 'lodash/fp';
import Style from '../styles/ChartStyle';
import {Chart, SW} from './Chart';

const ORIGIN = SW / 2;

let DATA;
let DEPTH = 0;
let CIRCLE;

const setup = (props) => {
    DATA = props.data;
    DEPTH = depthTree(DATA);

    CIRCLE = (DEPTH > 1) &&
        (
            <Circle
                fill="white"
                cx={SW / 2}
                cy={SW / 2}
                r={radiusBy(ORIGIN, DEPTH / 6, DEPTH - 1)}
            />
        );
};

class PieChart extends Chart {
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

    createPath({data, radius, percentage, rotation, depth, depthIndex}) {
        const max = sumBy(o => o.value, data);
        let mRotation = rotation;
        const sectors = [];

        data.map((item, key) => {
            const mPercentage = (percentage * item.value) / max;
            const aCalc = calcBy(mPercentage);
            const aRad = radBy(aCalc);
            const z = pointZBy(radius, aRad);
            const x = pointXBy(radius, aRad, aCalc);
            const y = pointYBy(z, x);
            const Y = (ORIGIN - radius) + y;
            const X = mPercentage <= 180 ? ORIGIN + x : ORIGIN - x;
            const arcSweep = mPercentage <= 180 ? 0 : 1;
            const fill = item.fill || colorByIndex(parseInt(key + z, 10));
            item.fill = fill;
            if (depthIndex === (depth - 1)) {
                this.legends[item.key || item.label] = {fill, label: item.label};
            }
            if (max === item.value) {
                sectors.push(
                    <Circle
                        key={item.key}
                        fill={fill}
                        cx={ORIGIN}
                        cy={ORIGIN}
                        r={radius}
                    />);
            }
            else {
                sectors.push(
                    <Path
                        key={item.key}
                        origin={`${ORIGIN}, ${ORIGIN}`}
                        rotate={mRotation}
                        d={`M ${ORIGIN} ${ORIGIN} V ${ORIGIN - radius} A ${radius} ${radius} 1 ${arcSweep} 1 ${X} ${Y} z`}
                        strokeWidth="0.5"
                        stroke="#fff"
                        strokeOpacity={0.5}
                        fill={fill}
                    />);
            }
            mRotation += mPercentage;
        });
        return sectors;
    }

    renderPies({data, percentage, rotation, depth, depthIndex}) {
        if (!data || data.length <= 0) {
            return [];
        }
        let piesArr = [];
        let mRotation = rotation;

        const radius = radiusBy(SW, depth, depthIndex);

        data.map(item => {
            const mPercentage = (percentage * item.value) / sumBy(o => o.value, data);
            piesArr = concat(piesArr,
                this.renderPies(
                    {
                        data: item.children,
                        percentage: mPercentage,
                        rotation: mRotation,
                        depth,
                        depthIndex: depthIndex - 1,
                    }));
            mRotation += mPercentage;
        });

        piesArr = concat(piesArr,
            this.createPath(
                {
                    data,
                    radius,
                    percentage,
                    rotation,
                    depth,
                    depthIndex,
                }));
        return piesArr;
    }

    renderBody() {
        this.legends = [];
        return (
            <View style={Style.view}>
                <Svg
                    width={SW}
                    height={SW}
                >
                    {
                        this.renderPies(
                            {
                                data: DATA,
                                percentage: 360,
                                rotation: 0,
                                depth: DEPTH,
                                depthIndex: DEPTH - 1,
                            })
                    }
                    {CIRCLE}
                </Svg>
            </View>
        );
    }
}

PieChart.propTypes = {
    data: PropTypes.oneOfType([PropTypes.array]),
    title: PropTypes.string,

};

PieChart.defaultProps = {
    data: Array,
    title: undefined,
};

export default PieChart;