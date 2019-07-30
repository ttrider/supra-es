export function nsTimeToString(ns: number) {
    return (new Date(ns / 1000)).toISOString().substr(11, 12);
}

export function humanizeString(value?: string) {

    if (value === undefined || value.length === 0) {
        return "";
    }

    const ret: string[] = [value[0]];

    for (let index = 1; index < value.length; index++) {
        const ch = value[index];

        if (ch.toUpperCase() === ch) {
            ret.push(" ");
        }
        ret.push(ch);
    }

    return ret.join("");
}

export function splitToLines(value: string, lineWidth: number = 35) {
    if (!value) {
        return [""];
    }

    if (value.length <= lineWidth) {
        return [value];
    }

    const parts = value.split(" ");

    const ret: string[] = [];

    let line: string[] = [];
    let lineLength = 0;
    for (let part of parts) {

        let partLength = part.length;

        while (partLength > lineWidth) {

            const chunkLength = lineWidth - lineLength - 2;

            line.push(part.substr(0, chunkLength) + "-");
            ret.push(line.join(" "));
            line = [];
            lineLength = 0;

            part = part.substr(chunkLength);
            partLength = part.length;
        }


        if ((lineLength + partLength + 1) < lineWidth) {
            line.push(part);
            lineLength += partLength + 1;
        } else {

            ret.push(line.join(" "));
            line = [];
            lineLength = 0;
        }
    }
    if (lineLength > 0) {
        ret.push(line.join(" "));
    }

    return ret;
}

export function formatCost(cost: number) {
    return (Math.round(cost * 10000.0) / 100.0).toFixed(2);
}

export function translate(x: number, y: number) {
    return `translate(${x}, ${y})`;
}

