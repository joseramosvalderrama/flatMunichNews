import { getFlats } from "./src/scrapper.js";
import { sendFlatUpdate } from "./src/sender.js";
import { filterAlreadySent } from "./src/storeFilter.js";
import { translateToEs } from "./src/translator.js";
import "dotenv/config";

const scrapFlats = async () => {
  let flats = await getFlats();
  flats = await filterAlreadySent(flats);
  flats = await translateToEs(flats);
  console.log(flats);
  await sendFlatUpdate(flats);
  process.exit(0);
};

scrapFlats();
