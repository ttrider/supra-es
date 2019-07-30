import fs from "fs";
import util from "util";
import { createCanvas } from "../src/model/canvas-model";

import example00 from "../src/examples/example00";
import example02 from "../src/examples/example02";
import example03 from "../src/examples/example03";

const writeFile = util.promisify(fs.writeFile);

// tslint:disable-next-line:no-console
run().then(() => console.info("Done")).catch(e => console.error(e));

async function run() {
    if (example00.profile) {
        const data00 = createCanvas(example00.profile);
        await writeFile("./results/example.canvas.json", JSON.stringify(data00, null, 2));
    }

    if (example02.profile) {
        const data00 = createCanvas(example02.profile);
        await writeFile("./results/example02.canvas.json", JSON.stringify(data00, null, 2));
    }
    
    if (example03.profile) {
        const data00 = createCanvas(example03.profile);
        await writeFile("./results/example03.canvas.json", JSON.stringify(data00, null, 2));
    }
    return 0;
}
