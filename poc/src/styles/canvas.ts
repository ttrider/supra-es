
const colors = {
    "primary0": "#91C1E6",
    "primary1": "#E7F3FD",
    "primary2": "#BCDBF3",
    "primary3": "#6CA8D6",
    "primary4": "#4B8FC3",
    "primary5": "#2a5a7e",
    "alt10": "#97e691",
    "alt11": "#e8fde7",
    "alt12": "#c0f3bc",
    "alt13": "#73d66c",
    "alt14": "#53c34b",
    "alt15": "#307e2a",
    "alt20": "#e6d291",
    "alt21": "#fdf8e7",
    "alt22": "#f3e6bc",
    "alt23": "#d6bd6c",
    "alt24": "#c3a74b",
    "alt25": "#7e6a2a",
    "alt30": "#e69196",
    "alt31": "#fde7e8",
    "alt32": "#f3bcc0",
    "alt33": "#d66c73",
    "alt34": "#c34b53",
    "alt35": "#7e2a30",
    "light": "#fdfeff",
    "dark": "#1d3e58",
    "warning": "#91a5e6",
    "attention": "#c34b53"
}

const fontFamily = "Roboto";
const fontSizeNormal = 60;

const styles = {
    myButton: {
        '& span': {
            // jss-nested applies this to a child span
            fontWeight: 'bold' // jss-camel-case turns this into 'font-weight'
        },
        color: 'green',
        margin: {
            // jss-expand gives more readable syntax
            top: 5, // jss-default-unit makes this 5px
            // tslint:disable-next-line:object-literal-sort-keys
            right: 0,
            bottom: 0,
            left: '1rem'
        }

    },
    myLabel: {
        fontStyle: 'italic'
    },

    foo:{
        "bar":{
            color:"blue"
        }

    },

    textBold: {
        fontFamily,
        fontSize: 49,
        fontWeight: "bold",
        lineHeight:49
    },

    textLargeBold: {
        fontFamily,
        fontSize: 66,
        fontWeight: "bold",
        lineHeight:66
    },
    textSmaller: {
        fontFamily,
        fontSize: 43,
        lineHeight:43
    },
    textSmallerBold: {
        fontFamily,
        fontSize: 43,
        fontWeight: "bold",
        lineHeight:43
    },

    nodeHeader: {
        marginTop: 20,
        marginLeft: 30
    },

    nodeHeaderText: {
        fontFamily,
        fontSize: fontSizeNormal,
        fontWeight: "bold",
        lineHeight: fontSizeNormal,
        fill: colors.dark
    },

    nodeIncomingPanel: {
        marginTop: 80
    },

    nodeIncomingPanelText: {
        fontFamily,
        fontSize: fontSizeNormal,
        fontWeight: "bold",
        textAnchor: "end",
        lineHeight: fontSizeNormal,
        marginLeft: 20,
        fill: colors.dark
    },
}

export default styles;
