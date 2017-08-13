import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
    layout: {
        padding: 10,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    view: {
        flex: 1,
        flexDirection: 'row',

    },
    svg: {
        backgroundColor: 'transparent',
    },
    title: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 14,
    },
});

export default style;