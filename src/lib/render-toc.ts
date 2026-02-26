import * as cheerio from "cheerio";

export type TocItem = {
  text: string;
  id: string;
};

export function renderToc(bodyHtml: string): { toc: TocItem[]; html: string } {
  const dom = cheerio.load(bodyHtml);
  const toc: TocItem[] = [];

  dom("h1, h2").each((i, el) => {
    const text = dom(el).text().trim();
    if (!text) return;

    const id = `heading-${i}`;
    dom(el).attr("id", id);
    toc.push({ text, id });
  });

  return { toc, html: dom("body").html() ?? bodyHtml };
}
