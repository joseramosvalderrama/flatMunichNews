import { getFlats } from "./src/scrapper.js";
import { sendFlatUpdate } from "./src/sender.js";
import { filterAlreadySent } from "./src/storeFilter.js";
import { translateToEs } from "./src/translator.js";

const flatsScrapped = await getFlats();
console.log({ scrapped: flatsScrapped });
const flatsStoreFiltered = await filterAlreadySent(flatsScrapped);
console.log({ database: flatsStoreFiltered });
const flatsTranslated = await translateToEs(flatsStoreFiltered);
console.log({ translated: flatsTranslated });
await sendFlatUpdate(flatsTranslated);
