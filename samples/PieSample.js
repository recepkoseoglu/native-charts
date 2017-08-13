import React from 'react';
import {View} from 'react-native';
import PieChart from '../charts/PieChart';


const PieData = [
    {
        value: 1500,
        label: 'A',
        key: '0',
        unit: 'ms',
        children: [
            {
                value: 1000,
                label: 'A1',
                key: '01',
                unit: 'ms',
            },
            {
                value: 2000,
                label: 'A2',
                key: '02',
                unit: 'ms',
            },
        ],
    },
    {
        value: 2500,
        label: 'B',
        key: '1',
        unit: 'ms',
        children: [
            {
                value: 1000,
                label: 'B1',
                key: '11',
                unit: 'ms',
            },
            {
                value: 4000,
                label: 'B2',
                key: '12',
                unit: 'ms',
            },
            {
                value: 2000,
                label: 'B3',
                key: '13',
                unit: 'ms',
            },
        ],
    },
    {
        value: 3000,
        label: 'C',
        key: '3',
        unit: 'ms',
        children: [
            {
                value: 1000,
                label: 'C1',
                key: '31',
                unit: 'ms',
            },
            {
                value: 2000,
                label: 'C2',
                key: '32',
                unit: 'ms',
            },
            {
                value: 1000,
                label: 'C3',
                key: '33',
                unit: 'ms',
            },
            {
                value: 2000,
                label: 'C4',
                key: '34',
                unit: 'ms',
            },
        ],
    },
];

const PieSample = () => {
    return (
        <View>
            <PieChart
                size={250}
                data={PieData}
                title="Pie Sammple"
            />
        </View>
    );
}

export default PieSample;