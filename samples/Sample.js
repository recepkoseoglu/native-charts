import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import AreaSample from './AreaSample';
import AreaChart from '../charts/AreaChart';
import LineChart from '../charts/LineChart';
import BarChart from '../charts/BarChart';
import ScatterChart from '../charts/ScatterChart';
import PieChart from '../charts/PieChart';
import LineSample from "./LineSample";
import BarSample from "./BarSample";
import PieSample from "./PieSample";
import ScatterSample from "./ScatterSample";

let data = [
    {name: "Ocak", temperature: 0.2, max: 4.2, min: -3.3},
    {name: "Şubat", temperature: 1.6, max: 6.3, min: -2.4},
    {name: "Mart", temperature: 5.7, max: 11.4, min: 0.6},
    {name: "Nisan", temperature: 11.3, max: 17.3, min: 5.3},
    {name: "Mayıs", temperature: 16.1, max: 22.3, min: 9.6},
    {name: "Haziran", temperature: 20.1, max: 26.6, min: 12.8},
    {name: "Temmuz", temperature: 23.5, max: 30.2, min: 15.8},
    {name: "Ağustos", temperature: 23.4, max: 30.4, min: 15.9},
    {name: "Eylül", temperature: 18.7, max: 25.9, min: 11.7},
    {name: "Ekim", temperature: 12.9, max: 19.9, min: 7.0},
    {name: "Kasım", temperature: 7.1, max: 13.0, min: 2.4},
    {name: "Aralık", temperature: 2.4, max: 6.4, min: -0.9},
];

let meta = [
    {datakey: "temperature", name: "Ortalama"},
    {datakey: "max", name: "En Yüksek"},
    {datakey: "min", name: "En Düşük"},
];

const dataA = [
    {x: 100, y: 100},
    {x: 120, y: 100},
    {x: 170, y: 300},
    {x: 140, y: 250},
    {x: 150, y: 400},
    {x: 110, y: 280},
    {x: 100, y: 200},
];


let PieData = [
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


const Sample = () => {

    return (
        <ScrollView>
            <View style={{marginVertical: 40}}>
                <AreaSample/>
                <LineSample/>
                <BarSample/>
                <ScatterSample/>
                <PieSample/>
            </View>
        </ScrollView>
    );
};

export default Sample;