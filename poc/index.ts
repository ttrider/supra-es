import fs from "fs";
import util from "util";
import { createCanvas } from "./canvas-model";
import { IResponse } from "./es-profile";


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

    return 0;
}

async function readJson<T>(filePath: string) {

    const buffer = await readFile(filePath);
    return JSON.parse(buffer.toString()) as T;
}


