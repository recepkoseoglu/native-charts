import {TextStyle, ViewStyle} from "react-native";

export class LegendStyle {
    layout: ViewStyle = {
        marginVertical: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    };

    text: TextStyle = {
        fontSize: 10,
        textAlign: "center",
        color: "#fff",
        paddingHorizontal: 5,
        paddingVertical: 5,
    };
}

export default LegendStyle;