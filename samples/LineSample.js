import React from 'react';
import {View} from 'react-native';
import LineChart from '../charts/LineChart';

const total = [
    {name: 'Ocak', temperature: 0.2, max: 4.2, min: -3.3},
    {name: 'Şubat', temperature: 1.6, max: 6.3, min: -2.4},
    {name: 'Mart', temperature: 5.7, max: 11.4, min: 0.6},
    {name: 'Nisan', temperature: 11.3, max: 17.3, min: 5.3},
    {name: 'Mayıs', temperature: 16.1, max: 22.3, min: 9.6},
    {name: 'Haziran', temperature: 20.1, max: 26.6, min: 12.8},
    {name: 'Temmuz', temperature: 23.5, max: 30.2, min: 15.8},
    {name: 'Ağustos', temperature: 23.4, max: 30.4, min: 15.9},
    {name: 'Eylül', temperature: 18.7, max: 25.9, min: 11.7},
    {name: 'Ekim', temperature: 12.9, max: 19.9, min: 7.0},
    {name: 'Kasım', temperature: 7.1, max: 13.0, min: 2.4},
    {name: 'Aralık', temperature: 2.4, max: 6.4, min: -0.9},
];

const min = [
    {name: 'Ocak', min: -3.3},
    {name: 'Şubat', min: -2.4},
    {name: 'Mart', min: 0.6},
    {name: 'Nisan', min: 5.3},
    {name: 'Mayıs', min: 9.6},
    {name: 'Haziran', min: 12.8},
    {name: 'Temmuz', min: 15.8},
    {name: 'Ağustos', min: 15.9},
    {name: 'Eylül', min: 11.7},
    {name: 'Ekim', min: 7.0},
    {name: 'Kasım', min: 2.4},
    {name: 'Aralık', min: -0.9},
];


const max = [
    {name: 'Ocak', max: 4.2},
    {name: 'Şubat', max: 6.3},
    {name: 'Mart', max: 11.4},
    {name: 'Nisan', max: 17.3},
    {name: 'Mayıs', max: 22.3},
    {name: 'Haziran', max: 26.6},
    {name: 'Temmuz', max: 30.2},
    {name: 'Ağustos', max: 30.4},
    {name: 'Eylül', max: 25.9},
    {name: 'Ekim', max: 19.9},
    {name: 'Kasım', max: 13.0},
    {name: 'Aralık', max: 6.4},
];


const meta = [
    {datakey: 'temperature', name: 'Ortalama'},
    {datakey: 'max', name: 'En Yüksek'},
    {datakey: 'min', name: 'En Düşük'},
];

const LineSample = () => {
    return (
        <View>
            <LineChart
                data={min}
                meta={meta}
                title={'Line Sample'}
            />
            <LineChart
                data={max}
                meta={meta}
                title={'Line Sample'}
            />
            <LineChart
                data={total}
                meta={meta}
                title={'Line Sample'}
            />
        </View>
    );
};

export default LineSample;