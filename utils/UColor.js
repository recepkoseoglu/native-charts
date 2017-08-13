const colors = [
    '#F44336',
    '#673AB7',
    '#2196F3',
    '#FF5722',
    '#9C27B0',
    '#FFC107',
    '#FF9800',
    '#4CAF50',
    '#00796B',
    '#009688',
    '#3F51B5',
];

const colorByIndex = index => colors[index % colors.length];

const colorByRand = () => colors[Math.floor(Math.random() * (colors.length - 1))];

export {
    colorByIndex,
    colorByRand,
}