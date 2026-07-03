import { useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import projectsData from "@/data/projectsData.json";
import {
  SITE,
  absoluteUrl,
  buildStructuredData,
  getPageMetadata,
  getRobotsContent,
  getSocialImage,
  serializeStructuredData,
} from "@/seo/siteMetadata";

const upsertMeta = ({ name, property, content }) => {
  const selector = name
    ? `meta[name="${name}"]`
    : `meta[property="${property}"]`;
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    if (name) element.setAttribute("name", name);
    if (property) element.setAttribute("property", property);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const upsertLink = ({ rel, href }) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
};

const upsertStructuredData = (data) => {
  const selector = 'script[type="application/ld+json"][data-seo="structured-data"]';
  let element = document.head.querySelector(selector);

  if (!data) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement("script");
    element.setAttribute("type", "application/ld+json");
    element.setAttribute("data-seo", "structured-data");
    document.head.appendChild(element);
  }

  element.textContent = serializeStructuredData(data);
};

const RouteSEO = ({ path }) => {
  const location = useLocation();
  const page = useMemo(
    () => getPageMetadata(path ?? location.pathname),
    [location.pathname, path]
  );

  useEffect(() => {
    const canonicalUrl = absoluteUrl(page.path);
    const imageUrl = getSocialImage();
    const robots = getRobotsContent(page);
    const structuredData = buildStructuredData(page, { projects: projectsData });

    document.documentElement.lang = SITE.language;
    document.title = page.title;

    upsertMeta({ name: "description", content: page.description });
    upsertMeta({ name: "robots", content: robots });
    upsertMeta({ name: "author", content: SITE.personName });
    upsertMeta({ name: "application-name", content: SITE.name });
    upsertMeta({ name: "theme-color", content: SITE.themeColor });
    upsertMeta({ name: "color-scheme", content: "dark" });

    upsertLink({ rel: "canonical", href: canonicalUrl });

    upsertMeta({ property: "og:locale", content: SITE.locale });
    upsertMeta({ property: "og:type", content: "website" });
    upsertMeta({ property: "og:title", content: page.title });
    upsertMeta({ property: "og:description", content: page.description });
    upsertMeta({ property: "og:url", content: canonicalUrl });
    upsertMeta({ property: "og:site_name", content: SITE.name });
    upsertMeta({ property: "og:image", content: imageUrl });
    upsertMeta({ property: "og:image:type", content: "image/png" });
    upsertMeta({ property: "og:image:width", content: String(SITE.defaultImageWidth) });
    upsertMeta({ property: "og:image:height", content: String(SITE.defaultImageHeight) });
    upsertMeta({ property: "og:image:alt", content: SITE.defaultImageAlt });

    upsertMeta({ name: "twitter:card", content: "summary_large_image" });
    upsertMeta({ name: "twitter:title", content: page.title });
    upsertMeta({ name: "twitter:url", content: canonicalUrl });
    upsertMeta({ name: "twitter:description", content: page.description });
    upsertMeta({ name: "twitter:image", content: imageUrl });
    upsertMeta({ name: "twitter:image:alt", content: SITE.defaultImageAlt });

    upsertStructuredData(structuredData);
  }, [page]);

  return null;
};

export default RouteSEO;
