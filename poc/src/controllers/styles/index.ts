import "./fonts.css";

const colors = {
    "primary0": "#91C1E6",
    "primary1": "#E7F3FD",
    "primary2": "#BCDBF3",
    "primary3": "#6CA8D6",
    "primary4": "#4B8FC3",
    "primary5": "#2a5a7e",
    "primaryLight": "#f0f7ff",
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
    "lightGray": "#a0a0a0",
    "gray": "#808080",
    "dark": "#1d3e58",
    "warning": "#91a5e6",
    "attention": "#c34b53",


    "actionbarColor": "#9ba2a7"
}

const fontFamily = "Roboto";
// const fontFamily = "helvetica";

const dimentions = {
    smallText: {
        fontSize: 48,
        lineHeight: 55
    },
    normalText: {
        fontSize: 60,
        lineHeight: 70
    }
    ,
    largeText: {
        fontSize: 72,
        lineHeight: 85
    },
    extraLargeText: {
        fontSize: 240,
        lineHeight: 284
    },

    padding: {
        extraLarge: 120,
        large: 60,
        normal: 30,
        small: 15,
        extraSmall: 10
    },

    stroke: {
        thinWidth: 2,
        normalWidth: 7,
    },

    nodeSize: {
        width: 210,
        height: 210,
    },

    smallNodeSize: {
        width: 100,
        height: 100,
    },

    cornerRadius: {
        normal: 50,
        small: 10
    },


    checkbox: {
        outerSize: 60,
        innerSize: 30
    }


}

function opacity(color: string, value: number) {

    if (color) {

        // rgba(253, 254, 255, 0.2);
        const parseparts = /#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/gim.exec(color)

        if (!parseparts || parseparts.length < 4) {
            return color;
        }

        return "rgba(" + parseparts.reduce<string[]>((parts, part, index) => {

            if (index > 0 && index <= 3) {
                parts.push(parseInt(part, 16).toString());
            }

            return parts;
        }, []).join(",") + "," + value + ")";

    }

    return color;
}


const styles = {

    // #region actionbar

    actionbar: {
        display: "flex",
        flexWrap: "nowrap",
        whiteSpace: "nowrap",
        justifyContent: "space-between",
        fontSize: "0.75em",
        left: 0,
        right: 0,
        top: 0,
        "z-index": 5,
        padding: {
            top: "0.25em",
            right: "0.5em",
            bottom: "0.25em",
            left: "0.5em",
        },
        textTransform: "uppercase",
        color: colors.actionbarColor,
        boxShadow: `${colors.actionbarColor} 0, 0.25em 1em`,

        "&:hover": {
            color: colors.dark,
        },

        "& .group": {
            display: "flex",

            "& .title": {
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                fontSize: "0.8em",
                margin: {
                    right: "0.25em"
                }
            },

            "& .spacer": {
                margin:
                {
                    left: "0.1em",
                    right: "0.1em"
                },
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
            },

            "& .button": {
                cursor: "pointer",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",

                "&:hover": {
                    textDecoration: "underline",
                    stroked: {
                        stroke: colors.actionbarColor,
                        strokeWidth: "10px"
                    }
                },

                stroked: {
                    stroke: colors.actionbarColor
                }
            },

            "& .selected": {
                fontWeight: "bold"
            }
        },


        "& .group-left": {
            justifyContent: "flex-start"
        },
        "& .group-right": {
            justifyContent: "flex-end"
        },
        "& .group-center": {
            justifyContent: "flex-center",
            padding: { left: "1em", right: "1em" }
        },

        "& .group-right-border": {
            borderLeft: "1px solid " + colors.actionbarColor,
            padding: { left: "0.25em" },
            margin: { left: "0.25em" },
        },

        "& .group-left-border": {
            borderRight: "1px solid " + colors.actionbarColor,
            padding: { right: "0.25em" },
            margin: { right: "0.25em" },
        },

        "& .group-stretch": {
            flexGrow: 1
        }
    },

    // #endregion actionbar

    // #region gradients

    gradientGreen: {

        "& .step01": { stopColor: colors.alt15, stopOpacity: 1 },
        "& .step02": { stopColor: colors.alt14, stopOpacity: 1 },
        "& .step03": { stopColor: colors.primary0, stopOpacity: 1 },
    },

    // #endregion gradients

    // #region node
    node: {





        padding: {
            left: dimentions.padding.normal,
            top: dimentions.padding.normal,
            right: dimentions.padding.normal,
            bottom: dimentions.padding.normal
        }
    },

    nodeBorder: {
        fill: opacity(colors.light, 0.2),
        rx: dimentions.padding.normal / 2,
        strokeWidth: dimentions.stroke.thinWidth,
        stroke: colors.primary2
    },

    nodeIcon: {
        width: dimentions.nodeSize.width,
        height: dimentions.nodeSize.height,
        stroke: colors.dark,
        strokeWidth: dimentions.stroke.thinWidth,

        margin: {
            right: dimentions.padding.normal
        }
    },

    smallNodeIcon: {
        width: dimentions.smallNodeSize.width,
        height: dimentions.smallNodeSize.height,
        stroke: colors.dark,
        strokeWidth: dimentions.stroke.thinWidth,

        margin: {
            right: dimentions.padding.small,
            bottom: dimentions.padding.small
        }
    },

    attachedNodes: {



        "& line": {
            stroke: colors.primary3,
            strokeWidth: dimentions.stroke.thinWidth,
            strokeDasharray: 4,
            fill: "none"
        }
    },

    nodeInputCostPanel: {
        margin: {
            top: dimentions.padding.normal
        }
    },
    nodeInputCost: {
        fontFamily,
        fontSize: dimentions.normalText.fontSize,
        lineHeight: dimentions.normalText.lineHeight,

        fontWeight: "bold",
        fill: colors.dark,
        textAnchor: "end",
        margin: {
            left: dimentions.padding.small
        }
    },
    nodeOutputCost: {
        fontFamily,
        fontSize: dimentions.normalText.fontSize,
        lineHeight: dimentions.normalText.lineHeight,

        fontWeight: "bold",
    },
    nodeOutputCostMarked: {
        fontFamily,
        fontSize: dimentions.normalText.fontSize,
        lineHeight: dimentions.normalText.lineHeight,

        fontWeight: "bold",
    },


    nodeMetrics: {
        padding: {
            top: dimentions.padding.normal,
            bottom: dimentions.padding.normal
        }
    },
    nodeMetricsTitle: {
        fontFamily,
        fontSize: dimentions.normalText.fontSize,
        lineHeight: dimentions.normalText.lineHeight,

        fill: colors.dark,
        marginRight: dimentions.padding.normal
    },
    nodeMetricsTitleMarked: {
        fontFamily,
        fontSize: dimentions.normalText.fontSize,
        lineHeight: dimentions.normalText.lineHeight,


        fontWeight: "bold",
        fill: colors.attention,
        marginRight: dimentions.padding.normal
    },
    nodeMetricsValue: {
        fontFamily,
        fontSize: dimentions.normalText.fontSize,
        lineHeight: dimentions.normalText.lineHeight,

        fill: colors.dark,
        textAnchor: "end",
        marginRight: dimentions.padding.normal
    },
    nodeMetricsValueMarked: {
        fontFamily,
        fontSize: dimentions.normalText.fontSize,
        lineHeight: dimentions.normalText.lineHeight,

        fontWeight: "bold",
        fill: colors.attention,
        textAnchor: "end",
        marginRight: dimentions.padding.normal
    },

    nodeTitle: {
        fontFamily,
        fontSize: dimentions.largeText.fontSize,
        lineHeight: dimentions.largeText.lineHeight,

        fontWeight: "bold",

        fill: colors.dark,
        textAnchor: "middle",

        padding: {
            bottom: dimentions.padding.normal
        }
    },

    nodeSubtitle: {
        fontFamily,
        fontSize: dimentions.normalText.fontSize,
        lineHeight: dimentions.normalText.lineHeight,

        fill: colors.dark,
        textAnchor: "middle",

        padding: {
            bottom: dimentions.padding.normal
        }
    },

    nodeFlags: {
        fontFamily,
        fontSize: dimentions.smallText.fontSize,
        lineHeight: dimentions.smallText.lineHeight,

        fill: colors.dark,
        textAnchor: "middle",

        padding: {
            bottom: dimentions.padding.normal
        }
    },

    nodeProperties: {

    },

    nodePropertiesTitle: {
        fontFamily,
        fontSize: dimentions.smallText.fontSize,
        lineHeight: dimentions.smallText.lineHeight,

        textTransform: "uppercase",
        fontWeight: "bold",
        fill: colors.dark,
        textAnchor: "middle",

        cursor: "pointer",
        userSelect: "none",

        "&:hover": {
            textDecoration: "underline"
        }
    },

    nodePropertiesGroupTitle: {
        fontFamily,
        fontSize: dimentions.smallText.fontSize,
        lineHeight: dimentions.smallText.lineHeight,

        fontWeight: "bold",

        fill: colors.dark,
    },

    nodePropertiesHeader: {
        fontFamily,
        fontSize: dimentions.normalText.fontSize,
        lineHeight: dimentions.normalText.lineHeight,

        fontWeight: "bold",

        fill: colors.dark,

        margin: {
            right: dimentions.padding.normal

        }
    },

    nodePropertiesHeaderRight: {
        fontFamily,
        fontSize: dimentions.normalText.fontSize,
        lineHeight: dimentions.normalText.lineHeight,

        fontWeight: "bold",

        fill: colors.dark,
        textAnchor: "end"
    },

    nodePropertiesBack: {

        fill: colors.primaryLight,
        stroke: "none",
        margin: {
            top: dimentions.padding.small,
        }
    },

    nodePropertiesValue: {
        fontFamily,
        fontSize: dimentions.normalText.fontSize,
        lineHeight: dimentions.normalText.lineHeight,

        fill: colors.dark,
        margin: {
            left: dimentions.padding.normal,
        }
    },

    nodePropertiesValueRight: {
        fontFamily,
        fontSize: dimentions.normalText.fontSize,
        lineHeight: dimentions.normalText.lineHeight,

        fill: colors.dark,
        textAnchor: "end"
    },

    // #endregion

    // #region panel

    panelTitle: {
        fontFamily,
        fontSize: dimentions.extraLargeText.fontSize,
        lineHeight: dimentions.extraLargeText.lineHeight,

        padding: {
            top: dimentions.padding.normal,
            bottom: dimentions.padding.normal,
            left: dimentions.padding.normal,
            right: dimentions.padding.normal,
        },

        "& g": {
            transform: `translate(${dimentions.padding.large}px, ${- (dimentions.extraLargeText.lineHeight + dimentions.padding.extraLarge)}px)`,
            opacity: 0.7,

            "& rect": {
                strokeWidth: dimentions.stroke.thinWidth,
                stroke: "none",
                rx: dimentions.cornerRadius.normal,
                ry: dimentions.cornerRadius.normal,
                height: dimentions.extraLargeText.lineHeight + dimentions.padding.large,

            },
            "& text": {
                stroke: colors.primary2,
                strokeWidth: 5,
                fill: "none",
                textTransform: "lowercase",
                transform: `translate(${dimentions.padding.normal}px, ${(dimentions.extraLargeText.lineHeight - dimentions.padding.small)}px)`
            },
        },

    },

    // #endregion panel

    // #region selector

    sectionPanel: {

        "& .sectionPanelHeader": {


            "& text": {

                textTransform: "uppercase",
                fontSize: dimentions.smallText.fontSize,
                lineHeight: dimentions.smallText.lineHeight,
                fontWeight: "bold",
                fill: colors.alt15,
                stroke: "none",
                transform: `translate(${dimentions.padding.small}px, ${dimentions.smallText.lineHeight + dimentions.padding.small}px)`

            }

        },

        "& .sectionGroups": {

            transform: `translate(0px, ${dimentions.padding.large + dimentions.checkbox.outerSize}px)`

        },

        "& .sectionGroup": {

            "& .separator": {
                fill: "url(#greenGrad)",
                height: 10,
            }

        },

        "& .sectionNode": {

            opacity: 0.7,

            "& .frame": {

                fill: colors.light,
                stroke: colors.alt12,
                strokeWidth: 4,
                rx: 15,
                ry: 15,
                cursor: "pointer"
            }

        },

        "& .sectionNodeSelected": {

            opacity: 1,

            "& .frame": {

                fill: colors.light,
                stroke: colors.alt12,
                strokeWidth: 8,
                rx: 15,
                ry: 15,
                cursor: "pointer"
            }

        },

    },

    selector: {

        margin: {
            bottom: dimentions.padding.normal
        },

        width: dimentions.padding.large + dimentions.checkbox.outerSize,



        "& .selectorPanel": {

            "& rect": {


            }

        },

        "& .selectorGroups": {

            transform: `translate(0px, ${dimentions.padding.large + dimentions.checkbox.outerSize}px)`

        },

        "& .selectorGroup": {

            "& rect": {
                fill: colors.alt15,
                height: 10,
                padding: {
                    left: dimentions.padding.small
                }
            }
        },

        "& .selectorItem": {


            "& text": {
                fontSize: dimentions.normalText.fontSize,
                lineHeight: dimentions.normalText.lineHeight,
                fontWeight: "bold",
                transform: `rotate(-90deg) translate(${- (dimentions.checkbox.outerSize + dimentions.padding.large)}px, ${dimentions.normalText.lineHeight}px)`,
                textAnchor: "end",
                cursor: "pointer",
                userSelect: "none",
                fill: colors.dark,


                "&:hover": {
                    textDecoration: "underline"
                }
            },

        },

        "& .checkbox": {
            width: dimentions.checkbox.outerSize,
            height: dimentions.checkbox.outerSize,
            transform: `translate(${dimentions.padding.extraSmall / 2}px, ${dimentions.padding.extraSmall}px)`,
            cursor: "pointer",

            "& .outer": {
                x: (dimentions.checkbox.outerSize - dimentions.checkbox.innerSize) / 2,
                y: (dimentions.checkbox.outerSize - dimentions.checkbox.innerSize) / 2,
                width: dimentions.checkbox.outerSize,
                height: dimentions.checkbox.outerSize,
                rx: dimentions.cornerRadius.small,
                ry: dimentions.cornerRadius.small,
                stroke: colors.primary5,
                strokeWidth: 4,
                fill: "none",

            },

            "& .inner": {
                x: (dimentions.checkbox.outerSize - dimentions.checkbox.innerSize),
                y: (dimentions.checkbox.outerSize - dimentions.checkbox.innerSize),
                width: dimentions.checkbox.innerSize,
                height: dimentions.checkbox.innerSize,
                rx: dimentions.cornerRadius.small / 2,
                ry: dimentions.cornerRadius.small / 2,

                strokeWidth: 4,
                fill: "none"
            },

            "& .inner-selected": {
                stroke: colors.primary5,
                fill: colors.primary4
            },

            "& .outer-clicked": {
                fill: colors.alt34
            },

            "&:hover": {

                "& .outer": {
                    stroke: colors.primary5,
                    fill: colors.alt12,
                }
            }

        }

    },

    // #endregion selector

    surface: {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        width: "auto",
        fontFamily,
        fontSize: "14px"
    },



}




export default styles;