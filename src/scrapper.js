import * as cheerio from "cheerio";

export const getFlats = async () => {
  const kleinanzeigenFlats = await getFlatsKleinanzeigen();
  const wgGesuchtFlats = await getFlatsWgGesucht();
  return [...kleinanzeigenFlats, ...wgGesuchtFlats];
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

const getFlatsWgGesucht = async () => {
  const url =
    "https://www.wg-gesucht.de/wg-zimmer-und-1-zimmer-wohnungen-und-wohnungen-und-haeuser-in-Muenchen.90.0+1+2+3.1.0.html?csrf_token=077adbd72467c32c549b7ccd29f0f0669ae5090a&offer_filter=1&city_id=90&sort_order=0&noDeact=1&categories%5B%5D=0&categories%5B%5D=1&categories%5B%5D=2&categories%5B%5D=3&rMax=1000";
  const response = await fetch(url);
  if (response.status !== 200) {
    console.log(response);
    return;
  }
  console.log(response);
  const body = await response.text();

  const $ = cheerio.load(body);

  return $(".offer_list_item").map((i, el) => {
    const titleElement = $(el).find(".truncate_title");
    const title = titleElement.attr("title");
    const link =
      "https://www.wg-gesucht.de" + titleElement.find("a").attr("href");
    const price = $(el)
      .find(".col-xs-3")
      .find("b")
      .first()
      .text()
      .replace(/[ €\n]/g, "");
    return { link, price, title };
  });
};
