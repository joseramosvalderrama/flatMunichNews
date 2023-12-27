import { getFlats } from "./src/scrapper.js";
import { sendFlatUpdate } from "./src/sender.js";

const flats = await getFlats();
console.log(flats);
sendFlatUpdate(flats);
