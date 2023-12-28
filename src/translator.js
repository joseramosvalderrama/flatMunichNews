import translate from "translate";

translate.engine = "deepl";
translate.key = "22cdcf0d-0175-db47-ba59-0d9bcf91e8b2:fx";

export const translateToEs = async (flats) => {
  const translateMap = {};
  for (const flat of flats) {
    const title_es = await translate(flat.title, { to: "es", from: "de" });
    console.log("traduccion " + title_es);
    translateMap[flat.title] = title_es;
  }
  return flats.map((flat) => ({ ...flat, title_es: translateMap[flat.title] }));
};
