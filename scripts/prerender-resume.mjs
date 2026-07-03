import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const siteUrl = "https://taha-khan.vercel.app";

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const renderList = (items = []) =>
  items.length
    ? `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
    : "";

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

const renderResumeSnapshot = (resumeData) => `
    <article class="crawler-resume" aria-label="Taha Khan resume">
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

      <p>
        <a href="${escapeHtml(resumeData.download.href)}">${escapeHtml(
  resumeData.download.label
)}</a>
      </p>
    </article>`;

const injectHeadMetadata = (html) => {
  const description =
    "Review Taha Khan's resume, including front-end development experience, education, React skills, CMS work, performance optimization, and technical SEO.";

  let output = html
    .replace(
      /<title>[\s\S]*?<\/title>/,
      "<title>Taha Khan Resume | Front-End Developer</title>"
    )
    .replace(
      /<meta name="description"[\s\S]*?>/,
      `<meta name="description" content="${description}" />`
    )
    .replace(
      /<meta property="og:title"[\s\S]*?>/,
      '<meta property="og:title" content="Taha Khan Resume | Front-End Developer" />'
    )
    .replace(
      /<meta property="og:description"[\s\S]*?>/,
      `<meta property="og:description" content="${description}" />`
    )
    .replace(
      /<meta property="og:url"[\s\S]*?>/,
      `<meta property="og:url" content="${siteUrl}/resume" />`
    )
    .replace(
      /<meta name="twitter:title"[\s\S]*?>/,
      '<meta name="twitter:title" content="Taha Khan Resume | Front-End Developer" />'
    )
    .replace(
      /<meta name="twitter:description"[\s\S]*?>/,
      `<meta name="twitter:description" content="${description}" />`
    );

  const crawlerHead = `
  <link rel="canonical" href="${siteUrl}/resume" />
  <meta name="robots" content="index, follow" />
  <style data-prerender-resume>
    #root:has(.crawler-resume) {
      min-height: 100vh;
      background: #050a08;
    }

    .crawler-resume {
      box-sizing: border-box;
      max-width: 960px;
      margin: 0 auto;
      padding: 32px 20px;
      color: #effff3;
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }

    .crawler-resume h1,
    .crawler-resume h2,
    .crawler-resume h3 {
      line-height: 1.2;
    }

    .crawler-resume a {
      color: #00ff5e;
    }
  </style>`;

  output = output.replace("</head>", `${crawlerHead}\n</head>`);
  return output;
};

const main = async () => {
  const [indexHtml, resumeJson] = await Promise.all([
    readFile(path.join(distDir, "index.html"), "utf8"),
    readFile(path.join(projectRoot, "src", "data", "resumeData.json"), "utf8"),
  ]);

  const resumeData = JSON.parse(resumeJson);
  const resumeHtml = injectHeadMetadata(indexHtml).replace(
    /<div id="root">\s*<\/div>/,
    `<div id="root">\n${renderResumeSnapshot(resumeData)}\n  </div>`
  );

  await mkdir(path.join(distDir, "resume"), { recursive: true });
  await Promise.all([
    writeFile(path.join(distDir, "resume", "index.html"), resumeHtml),
    writeFile(path.join(distDir, "resume.html"), resumeHtml),
  ]);

  console.log("Created crawler-readable resume HTML at dist/resume/index.html");
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
