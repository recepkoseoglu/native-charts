import {ViewStyle, TextStyle} from "react-native";

export class PieChartStyle {
    viewLayout: ViewStyle = {
        flex: 1,
        flexDirection: 'row'
    };

    svgLayout: ViewStyle = {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#e1e1e1",
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

export default PieChartStyle;