import {ViewStyle, TextStyle} from "react-native";


class AreaChartStyle {
    viewLayout: ViewStyle = {
        flex: 1,
        flexDirection: 'row',
    };

    svgLayout: ViewStyle = {
        backgroundColor: "transparent",
        transform: [{rotateX: "-180deg"}],
    };

    yAxisLayout: ViewStyle = {
        flexDirection: 'column',
    };

    xAxisLayout: ViewStyle = {
        flex: 1,
        flexDirection: 'row',
    };

    xAxisText: TextStyle = {
        fontSize: 10,
        textAlign: "left",
    };
}

export default AreaChartStyle;