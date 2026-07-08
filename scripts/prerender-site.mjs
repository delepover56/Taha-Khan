import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  PAGE_METADATA,
  INDEXABLE_ROUTES,
  SITE,
  absoluteUrl,
  buildStructuredData,
  getRobotsContent,
  serializeStructuredData,
} from "../src/seo/siteMetadata.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const srcDataDir = path.join(projectRoot, "src", "data");

const ROUTES_TO_PRERENDER = ["/", "/resume", "/portfolio", "/contact", "/404"];

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const escapeAttr = escapeHtml;

const readJson = async (fileName) =>
  JSON.parse(await readFile(path.join(srcDataDir, fileName), "utf8"));

const segmentText = (segments = []) =>
  segments.map((segment) => segment.text).join("");

const paragraphsFromSegments = (paragraphs = []) =>
  paragraphs
    .map((paragraph) => `<p>${escapeHtml(segmentText(paragraph))}</p>`)
    .join("");

const renderList = (items = []) =>
  items.length
    ? `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
    : "";

const renderInternalLinks = () => `
      <nav aria-label="Primary pages">
        <a href="/">About</a>
        <a href="/resume">Resume</a>
        <a href="/portfolio">Portfolio</a>
        <a href="/contact">Contact</a>
      </nav>`;

const renderAboutSnapshot = ({ aboutData, sideInfoBox }) => `
    <article class="crawler-page" aria-label="Taha Khan front-end developer profile">
      ${renderInternalLinks()}
      <header>
        <p>${escapeHtml(aboutData.hero.eyebrow)}</p>
        <h1>${escapeHtml(sideInfoBox.profile.name)} - ${escapeHtml(sideInfoBox.profile.role)}</h1>
        ${paragraphsFromSegments(aboutData.hero.introParagraphs)}
        <p>${escapeHtml(aboutData.hero.stackSummary)}</p>
        <p><a href="${escapeAttr(aboutData.hero.ctaPath)}">${escapeHtml(aboutData.hero.ctaLabel)}</a></p>
      </header>

      <section>
        <p>${escapeHtml(aboutData.buildSection.eyebrow)}</p>
        <h2>${escapeHtml(aboutData.buildSection.title)}</h2>
        <p>${escapeHtml(aboutData.buildSection.summary)}</p>
        ${aboutData.buildSection.cards
          .map(
            (card) => `
              <section>
                <p>${escapeHtml(card.label)}</p>
                <h3>${escapeHtml(card.title)}</h3>
                <p>${escapeHtml(card.text)}</p>
              </section>`
          )
          .join("")}
      </section>

      <section>
        <p>${escapeHtml(aboutData.growthSection.eyebrow)}</p>
        <h2>${escapeHtml(aboutData.growthSection.title)}</h2>
        <p>${escapeHtml(aboutData.growthSection.summary)}</p>
        ${aboutData.growthSection.items
          .map(
            (item) => `
              <section>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.text)}</p>
              </section>`
          )
          .join("")}
      </section>
    </article>`;

const renderTimeline = (section) => `
      <section>
        <p>${escapeHtml(section.eyebrow)}</p>
        <h2>${escapeHtml(section.title)}</h2>
        <p>${escapeHtml(section.summary)}</p>
        <ol>
          ${section.items
            .map(
              (item) => `
                <li>
                  <p>${escapeHtml(item.period)}</p>
                  <h3>${escapeHtml(item.title)}</h3>
                  <p>${escapeHtml(item.place)}</p>
                  ${item.note ? `<p>${escapeHtml(item.note)}</p>` : ""}
                </li>`
            )
            .join("")}
        </ol>
      </section>`;

const renderResumeSnapshot = ({ resumeData }) => `
    <article class="crawler-page" aria-label="Taha Khan resume">
      ${renderInternalLinks()}
      <header>
        <p>${escapeHtml(resumeData.intro.eyebrow)}</p>
        <h1>Taha Khan - ${escapeHtml(resumeData.intro.title)}</h1>
        <p>${escapeHtml(resumeData.intro.summary)}</p>
        ${renderList(resumeData.intro.tags)}
      </header>

      ${renderTimeline(resumeData.experience)}
      ${renderTimeline(resumeData.education)}

      <section>
        <p>${escapeHtml(resumeData.skills.eyebrow)}</p>
        <h2>${escapeHtml(resumeData.skills.title)}</h2>
        <p>${escapeHtml(resumeData.skills.summary)}</p>
        ${resumeData.skills.groups
          .map(
            (group) => `
              <section>
                <h3>${escapeHtml(group.title)}</h3>
                <p>${escapeHtml(group.description)}</p>
                ${renderList(group.items)}
              </section>`
          )
          .join("")}
      </section>

      <section>
        <p>${escapeHtml(resumeData.learning.eyebrow)}</p>
        <h2>${escapeHtml(resumeData.learning.title)}</h2>
        <p>${escapeHtml(resumeData.learning.summary)}</p>
        ${resumeData.learning.items
          .map(
            (item) => `
              <section>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.text)}</p>
              </section>`
          )
          .join("")}
      </section>

      <p><a href="${escapeAttr(resumeData.download.href)}">${escapeHtml(resumeData.download.label)}</a></p>
    </article>`;

const renderPortfolioSnapshot = ({ projectsData }) => `
    <article class="crawler-page" aria-label="Taha Khan portfolio projects">
      ${renderInternalLinks()}
      <header>
        <p>Portfolio</p>
        <h1>Featured Front-End Development Projects</h1>
        <p>Explore selected responsive websites, frontend interfaces, and CMS projects by Taha Khan across React, WordPress, WooCommerce, Shopify, accessibility, performance, and technical SEO.</p>
      </header>

      <section>
        <h2>Selected Projects</h2>
        ${projectsData
          .map(
            (project) => `
              <article>
                <h3>${escapeHtml(project.name)}</h3>
                <p>${escapeHtml(project.description)}</p>
                <p>${escapeHtml(project.category)} - ${escapeHtml(project.status)}</p>
                ${renderList(project.stack)}
                ${project.link ? `<p><a href="${escapeAttr(project.link)}">View ${escapeHtml(project.name)} live site</a></p>` : ""}
                ${project.github ? `<p><a href="${escapeAttr(project.github)}">View ${escapeHtml(project.name)} source code</a></p>` : ""}
              </article>`
          )
          .join("")}
      </section>
    </article>`;

const renderContactSnapshot = ({ contactData }) => `
    <article class="crawler-page" aria-label="Contact Taha Khan">
      ${renderInternalLinks()}
      <header>
        <p>${escapeHtml(contactData.intro.eyebrow)}</p>
        <h1>${escapeHtml(segmentText(contactData.intro.titleSegments))}</h1>
        <p>${escapeHtml(contactData.intro.summary)}</p>
        <p>${escapeHtml(contactData.intro.availability)}</p>
      </header>

      <section>
        <h2>Contact Options</h2>
        ${contactData.quickContactCards
          .map(
            (card) => `
              <section>
                <p>${escapeHtml(card.eyebrow)}</p>
                <h3>${escapeHtml(card.title)}</h3>
                <p>${escapeHtml(card.text)}</p>
                ${card.href ? `<p><a href="${escapeAttr(card.href)}">${escapeHtml(card.linkLabel ?? card.title)}</a></p>` : ""}
              </section>`
          )
          .join("")}
      </section>

      <section>
        <p>${escapeHtml(contactData.formIntro.eyebrow)}</p>
        <h2>${escapeHtml(contactData.formIntro.title)}</h2>
        <p>${escapeHtml(contactData.formIntro.summary)}</p>
      </section>

      <section>
        <h2>${escapeHtml(contactData.ctaStrip.eyebrow)}</h2>
        <p>${escapeHtml(contactData.ctaStrip.text)}</p>
        <p><a href="${escapeAttr(contactData.ctaStrip.email.href)}">${escapeHtml(contactData.ctaStrip.email.label)}</a></p>
      </section>
    </article>`;

const renderNotFoundSnapshot = () => `
    <article class="crawler-page" aria-label="Page not found">
      <header>
        <p>404</p>
        <h1>Page Not Found</h1>
        <p>This link may be broken, moved, or typed incorrectly.</p>
        <p><a href="/">Back Home</a></p>
      </header>
    </article>`;

const renderSnapshot = (route, data) => {
  switch (route) {
    case "/":
      return renderAboutSnapshot(data);
    case "/resume":
      return renderResumeSnapshot(data);
    case "/portfolio":
      return renderPortfolioSnapshot(data);
    case "/contact":
      return renderContactSnapshot(data);
    case "/404":
      return renderNotFoundSnapshot();
    default:
      return renderNotFoundSnapshot();
  }
};

const replaceOrInsert = (html, pattern, tag) => {
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `  ${tag}\n</head>`);
};

const setMetaName = (html, name, content) =>
  replaceOrInsert(
    html,
    new RegExp(`<meta\\s+name=["']${name}["'][\\s\\S]*?>`, "i"),
    `<meta name="${name}" content="${escapeAttr(content)}" />`
  );

const setMetaProperty = (html, property, content) =>
  replaceOrInsert(
    html,
    new RegExp(`<meta\\s+property=["']${property}["'][\\s\\S]*?>`, "i"),
    `<meta property="${property}" content="${escapeAttr(content)}" />`
  );

const setCanonical = (html, href) =>
  replaceOrInsert(
    html,
    /<link\s+rel=["']canonical["'][\s\S]*?>/i,
    `<link rel="canonical" href="${escapeAttr(href)}" />`
  );

const injectHeadMetadata = (html, page, projectsData) => {
  const canonical = absoluteUrl(page.path);
  const image = absoluteUrl(SITE.defaultImage);
  const structuredData = buildStructuredData(page, { projects: projectsData });
  let output = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(page.title)}</title>`
  );

  output = setCanonical(output, canonical);
  output = setMetaName(output, "description", page.description);
  output = setMetaName(output, "robots", getRobotsContent(page));
  output = setMetaName(output, "author", SITE.personName);
  output = setMetaName(output, "application-name", SITE.name);
  output = setMetaName(output, "theme-color", SITE.themeColor);
  output = setMetaName(output, "color-scheme", "dark");
  output = setMetaProperty(output, "og:locale", SITE.locale);
  output = setMetaProperty(output, "og:type", "website");
  output = setMetaProperty(output, "og:title", page.title);
  output = setMetaProperty(output, "og:description", page.description);
  output = setMetaProperty(output, "og:url", canonical);
  output = setMetaProperty(output, "og:image", image);
  output = setMetaProperty(output, "og:image:type", "image/png");
  output = setMetaProperty(output, "og:image:width", String(SITE.defaultImageWidth));
  output = setMetaProperty(output, "og:image:height", String(SITE.defaultImageHeight));
  output = setMetaProperty(output, "og:image:alt", SITE.defaultImageAlt);
  output = setMetaProperty(output, "og:site_name", SITE.name);
  output = setMetaName(output, "twitter:card", "summary_large_image");
  output = setMetaName(output, "twitter:title", page.title);
  output = setMetaName(output, "twitter:url", canonical);
  output = setMetaName(output, "twitter:description", page.description);
  output = setMetaName(output, "twitter:image", image);
  output = setMetaName(output, "twitter:image:alt", SITE.defaultImageAlt);

  output = output.replace(
    /\s*<script type="application\/ld\+json" data-seo="structured-data">[\s\S]*?<\/script>/g,
    ""
  );

  if (structuredData) {
    output = output.replace(
      "</head>",
      `  <script type="application/ld+json" data-seo="structured-data">${serializeStructuredData(
        structuredData
      )}</script>\n</head>`
    );
  }

  const crawlerBoot = `
  <script data-prerender-boot>
    document.documentElement.classList.add("js");
  </script>`;

  const crawlerStyle = `
  <style data-prerender-page>
    #root:has(.crawler-page) {
      min-height: 100vh;
      background: #050a08;
    }

    html.js #root:has(.crawler-page) {
      overflow: hidden;
    }

    .crawler-page {
      box-sizing: border-box;
      max-width: 980px;
      margin: 0 auto;
      padding: 32px 20px;
      color: #effff3;
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }

    html.js .crawler-page {
      display: none;
    }

    .crawler-page nav {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 24px;
    }

    .crawler-page h1,
    .crawler-page h2,
    .crawler-page h3 {
      line-height: 1.2;
    }

    .crawler-page a {
      color: #00ff5e;
    }
  </style>
  <noscript>
    <style data-prerender-noscript>
      .crawler-page {
        display: block;
      }
    </style>
  </noscript>`;

  output = output.replace(
    /\s*<script data-prerender-boot>[\s\S]*?<\/script>/g,
    ""
  );
  output = output.replace(
    /\s*<style data-prerender-page>[\s\S]*?<\/style>/g,
    ""
  );
  output = output.replace(
    /\s*<noscript>\s*<style data-prerender-noscript>[\s\S]*?<\/style>\s*<\/noscript>/g,
    ""
  );
  output = output.replace("</head>", `${crawlerBoot}\n${crawlerStyle}\n</head>`);
  return output;
};

const routeOutputTargets = (route) => {
  if (route === "/") return [path.join(distDir, "index.html")];
  if (route === "/404") {
    return [
      path.join(distDir, "404.html"),
      path.join(distDir, "404", "index.html"),
    ];
  }

  const segment = route.replace(/^\//, "");
  return [
    path.join(distDir, segment, "index.html"),
    path.join(distDir, `${segment}.html`),
  ];
};

const writeRouteHtml = async (route, html) => {
  const targets = routeOutputTargets(route);

  await Promise.all(
    targets.map(async (target) => {
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, html);
    })
  );
};

const renderSitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${INDEXABLE_ROUTES.map((route) => {
  const page = PAGE_METADATA[route];

  return `  <url>
    <loc>${absoluteUrl(page.path)}</loc>
    <lastmod>${SITE.dateModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
}).join("\n")}
</urlset>
`;

const renderRobots = () => `User-agent: *
Allow: /

Sitemap: ${absoluteUrl("/sitemap.xml")}
`;

const writeCrawlFiles = async () => {
  await Promise.all([
    writeFile(path.join(distDir, "sitemap.xml"), renderSitemap()),
    writeFile(path.join(distDir, "robots.txt"), renderRobots()),
  ]);
};

const main = async () => {
  const [indexHtml, aboutData, resumeData, projectsData, contactData, sideInfoBox] =
    await Promise.all([
      readFile(path.join(distDir, "index.html"), "utf8"),
      readJson("aboutData.json"),
      readJson("resumeData.json"),
      readJson("projectsData.json"),
      readJson("contactData.json"),
      readJson("sideInfoBox.json"),
    ]);

  const data = {
    aboutData,
    resumeData,
    projectsData,
    contactData,
    sideInfoBox,
  };

  await Promise.all(
    ROUTES_TO_PRERENDER.map(async (route) => {
      const page = PAGE_METADATA[route];
      const html = injectHeadMetadata(indexHtml, page, projectsData).replace(
        /<div id="root">\s*<\/div>/,
        `<div id="root">\n${renderSnapshot(route, data)}\n  </div>`
      );

      await writeRouteHtml(route, html);
    })
  );

  await writeCrawlFiles();

  console.log("Created crawler-readable HTML, sitemap.xml, and robots.txt for production.");
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
