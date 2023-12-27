import * as cheerio from "cheerio";

export const getFlats = async () => {
  return await getFlatsKleinanzeigen();
};

const getFlatsKleinanzeigen = async () => {
  const url =
    "https://www.kleinanzeigen.de/s-wohnung-mieten/muenchen/c203l6411+wohnung_mieten.verfuegbarm_i:4%2C+wohnung_mieten.verfuegbary_i:2024%2C";

  const response = await fetch(url);
  if (response.status !== 200) {
    console.log(response);
    return;
  }
  const body = await response.text();

  const $ = cheerio.load(body);

  return $("article.aditem").map((i, el) => {
    const linkHtml = $(el).find("a.ellipsis");
    const link = "https://www.kleinanzeigen.de/" + linkHtml.attr("href");
    const title = linkHtml.text();
    const price = $(el)
      .find(".aditem-main--middle--price-shipping--price")
      .text()
      .replace(/[ €\n]/g, "");
    return { link, price, title };
  });
};
