import fs from "fs";
import util from "util";
import { createCanvas } from "../model/canvas-model";
import { IResponse } from "../model/model";


const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


console.info("processing....");

run().then(() => console.info("Done")).catch(e => console.error(e));


async function run() {

    const profile00 = await readJson<IResponse>("data/example.json");
    if (profile00.profile) {
        const data00 = createCanvas(profile00.profile);
        await writeFile("data/example.canvas.json", JSON.stringify(data00, null, 2));
    }

    const profile01 = await readJson<IResponse>("data/example02.json");
    if (profile01.profile) {
        const data00 = createCanvas(profile01.profile);
        await writeFile("data/example02.canvas.json", JSON.stringify(data00, null, 2));
    }

    const profile03 = await readJson<IResponse>("data/example03.json");
    if (profile03.profile) {
        const data00 = createCanvas(profile03.profile);
        await writeFile("data/example03.canvas.json", JSON.stringify(data00, null, 2));
    }
    return 0;
}

async function readJson<T>(filePath: string) {

    const buffer = await readFile(filePath);
    return JSON.parse(buffer.toString()) as T;
}


