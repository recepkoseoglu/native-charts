import {ViewStyle, TextStyle} from "react-native";


export class ScatterChartStyle {
    viewLayout: ViewStyle = {
        flex: 1,
        flexDirection: 'row'
    };

    svgLayout: ViewStyle = {
        backgroundColor: "transparent",
    };

    yAxisLayout: ViewStyle = {
        flexDirection: 'column'
    };
    xAxisLayout: ViewStyle = {
        flex: 1,
        flexDirection: 'row'
    };

    xAxisText: TextStyle = {
        fontSize: 10,
        textAlign: "right"
    };
}

export default ScatterChartStyle;