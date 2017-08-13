import React from 'react';
import {View} from 'react-native';
import ScatterChart from '../charts/ScatterChart';


const dataA = [
    {x: 100, y: 100},
    {x: 120, y: 100},
    {x: 170, y: 300},
    {x: 140, y: 250},
    {x: 150, y: 400},
    {x: 110, y: 280},
    {x: 100, y: 200},
];


const ScatterSample = () => {
    return (
        <View>
            <ScatterChart
                data={dataA}
                title="Scatter Sample"
            />
        </View>
    );
};

export default ScatterSample;