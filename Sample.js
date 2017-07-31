import React, {Component} from "react";
import {ScrollView, Text} from "react-native";
import AreaChart from "./charts/AreaChart";
import LineChart from "./charts/LineChart";
import BarChart from "./charts/BarChart";
import ScatterChart from "./charts/ScatterChart";
import PieChart from "./charts/PieChart";

let data = [
    {name: "A", public: 4000, private: 2400, protected: 2400},
    {name: "B", public: 3000, private: 1398, protected: 2210},
    {name: "C", public: 2000, private: 9800, protected: 2290},
    {name: "D", public: 2780, private: 3908, protected: 2000},
    {name: "E", public: 1890, private: 4800, protected: 2181},
    {name: "F", public: 2390, private: 3800, protected: 2500},
    {name: "G", public: 3490, private: 4300, protected: 2100}
];

let meta = [
    {dataKey: "public", name: "Public", unit: "piece"},
    {dataKey: "private", name: "Private", unit: "piece"},
    {dataKey: "protected", name: "Protected", unit: "piece"}
];

const dataA = [
    {x: 100, y: 200, z: 200},
    {x: 120, y: 100, z: 260},
    {x: 170, y: 300, z: 400},
    {x: 140, y: 250, z: 280},
    {x: 150, y: 400, z: 500},
    {x: 110, y: 280, z: 200},
    {x: 100, y: 200, z: 200},
    {x: 120, y: 100, z: 260},
    {x: 170, y: 300, z: 400},
    {x: 140, y: 250, z: 280},
    {x: 150, y: 400, z: 500},
    {x: 110, y: 280, z: 200}
];

const dataB = [
    {x: 200, y: 260, z: 240},
    {x: 240, y: 290, z: 220},
    {x: 190, y: 290, z: 250},
    {x: 198, y: 250, z: 210},
    {x: 180, y: 280, z: 260},
    {x: 210, y: 220, z: 230}];

const ScatterData = [
    {name: "A", data: dataA},
    {name: "B", data: dataB}
];

let ScatterMeta = [
    {dataKey: "x", unit: "cm", name: "X"},
    {dataKey: "y", unit: "cm", name: "Y"},
    {dataKey: "z", unit: "cm", name: "Z"}
];


let PieData = [
    {
        value: 1500,
        label: "A",
        key: "0",
        unit: "ms",
        children: [
            {
                value: 1000,
                label: "A1",
                key: "01",
                unit: "ms"
            },
            {
                value: 2000,
                label: "A2",
                key: "02",
                unit: "ms"
            }
        ]
    },
    {
        value: 2500,
        label: "B",
        key: "1",
        unit: "ms",
        children: [
            {
                value: 1000,
                label: "B1",
                key: "11",
                unit: "ms"
            },
            {
                value: 4000,
                label: "B2",
                key: "12",
                unit: "ms"
            },
            {
                value: 2000,
                label: "B3",
                key: "13",
                unit: "ms"
            }
        ]
    },
    {
        value: 3000,
        label: "C",
        key: "3",
        unit: "ms",
        children: [
            {
                value: 1000,
                label: "C1",
                key: "31",
                unit: "ms"
            },
            {
                value: 2000,
                label: "C2",
                key: "32",
                unit: "ms"
            },
            {
                value: 1000,
                label: "C3",
                key: "33",
                unit: "ms"
            },
            {
                value: 2000,
                label: "C4",
                key: "34",
                unit: "ms"
            }
        ]
    }
];


export default class Sample extends Component {


    render() {
        return (
            <ScrollView style={{marginVertical: 40, paddingHorizontal: 30}}>
                <Text>Area Chart</Text>
                <AreaChart
                    data={data}
                    meta={meta}
                    width={250}/>
                <Text>Line Chart</Text>
                <LineChart
                    data={data}
                    meta={meta}
                    width={250}/>
                <Text>Bar Chart</Text>
                <BarChart
                    data={data}
                    meta={meta}
                    width={250}/>
                <Text>Scatter Chart</Text>
                <ScatterChart
                    data={ScatterData}
                    meta={ScatterMeta}
                    width={250}/>
                <Text>Pie Chart</Text>
                <PieChart
                    size={250}
                    data={PieData}/>
            </ScrollView>)
    }

}