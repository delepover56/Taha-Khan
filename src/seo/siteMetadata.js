export const SITE = {
  name: "Taha Khan Portfolio",
  shortName: "Taha Khan",
  personName: "M. Taha Khan",
  role: "Front-End Developer",
  origin: "https://taha-khan.vercel.app",
  language: "en",
  locale: "en_US",
  themeColor: "#00ff5e",
  dateModified: "2026-07-03",
  defaultImage: "/Images/preview.png",
  defaultImageWidth: 1365,
  defaultImageHeight: 767,
  defaultImageAlt: "Preview of Taha Khan front-end developer portfolio",
  email: "mailto:Taha82426980@gmail.com",
  emailAddress: "Taha82426980@gmail.com",
  phone: "+923192924947",
  location: "Karachi, Pakistan",
  addressCountry: "PK",
  socialLinks: [
    "https://github.com/delepover56",
    "https://www.linkedin.com/in/taha-khan03/",
    "https://www.instagram.com/m.e_t.a.h.a/",
  ],
  skills: [
    "React",
    "JavaScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
    "WordPress",
    "WooCommerce",
    "Shopify",
    "Technical SEO",
    "Performance Optimization",
    "Accessibility",
    "Responsive Web Design",
  ],
};

export const PAGE_METADATA = {
  "/": {
    key: "home",
    path: "/",
    title: "Taha Khan | Front-End Developer, React & WordPress",
    description:
      "M. Taha Khan is a front-end developer in Karachi building responsive React, WordPress, WooCommerce, Shopify, and technical SEO focused websites.",
    breadcrumbName: "Home",
    schemaType: "ProfilePage",
    intent: "Personal profile and front-end development services overview",
    priority: "1.0",
  },
  "/resume": {
    key: "resume",
    path: "/resume",
    title: "Resume | Taha Khan, Front-End Developer",
    description:
      "View Taha Khan's resume with front-end development experience, web development education, React skills, CMS work, performance optimization, and technical SEO.",
    breadcrumbName: "Resume",
    schemaType: "WebPage",
    intent: "Resume, skills, education, and professional experience",
    priority: "0.8",
  },
  "/portfolio": {
    key: "portfolio",
    path: "/portfolio",
    title: "Portfolio Projects | Taha Khan Front-End Developer",
    description:
      "Explore selected frontend, React, WordPress, WooCommerce, and Shopify projects by Taha Khan, focused on responsive UI, accessibility, performance, and SEO.",
    breadcrumbName: "Portfolio",
    schemaType: "CollectionPage",
    intent: "Selected web development projects and case work",
    priority: "0.9",
  },
  "/contact": {
    key: "contact",
    path: "/contact",
    title: "Contact Taha Khan | Front-End Developer",
    description:
      "Contact Taha Khan for frontend development, React interfaces, WordPress, WooCommerce, Shopify websites, technical SEO, freelance work, and collaborations.",
    breadcrumbName: "Contact",
    schemaType: "ContactPage",
    intent: "Direct contact for front-end development work",
    priority: "0.7",
  },
  "/404": {
    key: "notFound",
    path: "/404",
    title: "Page Not Found | Taha Khan Portfolio",
    description:
      "The requested page could not be found. Return to Taha Khan's portfolio to view front-end development work, resume, and contact information.",
    breadcrumbName: "Page Not Found",
    schemaType: "WebPage",
    robots: "noindex, follow",
    intent: "Helpful error page for unavailable URLs",
  },
};

export const INDEXABLE_ROUTES = ["/", "/resume", "/portfolio", "/contact"];

export const REDIRECT_ROUTES = {
  "/about": "/",
  "/projects": "/portfolio",
};

const stripTrailingSlash = (path) =>
  path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;

export const normalizePath = (path = "/") => {
  const cleanPath = stripTrailingSlash(path.split("?")[0].split("#")[0] || "/");
  return cleanPath || "/";
};

export const absoluteUrl = (path = "/") => {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE.origin}${path.startsWith("/") ? path : `/${path}`}`;
};

export const getPageMetadata = (path = "/") => {
  const normalizedPath = normalizePath(path);
  const canonicalPath = REDIRECT_ROUTES[normalizedPath] ?? normalizedPath;
  return PAGE_METADATA[canonicalPath] ?? PAGE_METADATA["/404"];
};

const personEntity = {
  "@type": "Person",
  "@id": `${SITE.origin}/#person`,
  name: SITE.personName,
  alternateName: SITE.shortName,
  url: SITE.origin,
  image: absoluteUrl("/Images/myAvatar.webp"),
  jobTitle: SITE.role,
  description: PAGE_METADATA["/"].description,
  email: SITE.emailAddress,
  telephone: SITE.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: SITE.addressCountry,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "professional inquiries",
    email: SITE.emailAddress,
    telephone: SITE.phone,
    areaServed: "Worldwide",
    availableLanguage: ["English", "Urdu"],
  },
  sameAs: SITE.socialLinks,
  knowsAbout: SITE.skills,
  knowsLanguage: ["English", "Urdu"],
  hasOccupation: {
    "@type": "Occupation",
    name: SITE.role,
    occupationLocation: {
      "@type": "City",
      name: "Karachi",
    },
    skills: SITE.skills.join(", "),
  },
};

const websiteEntity = {
  "@type": "WebSite",
  "@id": `${SITE.origin}/#website`,
  url: SITE.origin,
  name: SITE.name,
  inLanguage: SITE.language,
  description: PAGE_METADATA["/"].description,
  creator: {
    "@id": `${SITE.origin}/#person`,
  },
  publisher: {
    "@id": `${SITE.origin}/#person`,
  },
};

const buildBreadcrumb = (page) => {
  const items =
    page.path === "/"
      ? [{ name: "Home", path: "/" }]
      : [
          { name: "Home", path: "/" },
          { name: page.breadcrumbName, path: page.path },
        ];

  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(page.path)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
};

const buildProjectItem = (project) => ({
  "@type": "CreativeWork",
  name: project.name,
  description: project.description,
  image: {
    "@type": "ImageObject",
    url: absoluteUrl(project.image),
    width: project.imageWidth,
    height: project.imageHeight,
    caption: project.alt,
  },
  url: project.link || undefined,
  sameAs: project.github || undefined,
  genre: project.category,
  keywords: project.stack?.join(", "),
  isAccessibleForFree: true,
  creator: {
    "@id": `${SITE.origin}/#person`,
  },
});

export const buildStructuredData = (page, { projects = [] } = {}) => {
  if (page.key === "notFound") return null;

  const canonical = absoluteUrl(page.path);
  const breadcrumb = buildBreadcrumb(page);
  const webPage = {
    "@type": page.schemaType,
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: page.title,
    description: page.description,
    inLanguage: SITE.language,
    dateModified: SITE.dateModified,
    isPartOf: {
      "@id": `${SITE.origin}/#website`,
    },
    about: {
      "@id": `${SITE.origin}/#person`,
    },
    author: {
      "@id": `${SITE.origin}/#person`,
    },
    publisher: {
      "@id": `${SITE.origin}/#person`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(SITE.defaultImage),
      width: SITE.defaultImageWidth,
      height: SITE.defaultImageHeight,
    },
    breadcrumb: {
      "@id": `${canonical}#breadcrumb`,
    },
  };

  const graph = [personEntity, websiteEntity, breadcrumb, webPage];

  if (page.key === "home" || page.key === "resume") {
    webPage.mainEntity = {
      "@id": `${SITE.origin}/#person`,
    };
  }

  if (page.key === "portfolio") {
    const itemList = {
      "@type": "ItemList",
      "@id": `${canonical}#projects`,
      name: "Selected portfolio projects",
      url: canonical,
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: buildProjectItem(project),
      })),
    };

    webPage.mainEntity = {
      "@id": `${canonical}#projects`,
    };
    graph.push(itemList);
  }

  if (page.key === "contact") {
    webPage.mainEntity = {
      "@id": `${SITE.origin}/#person`,
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
};

export const getRobotsContent = (page) =>
  page.robots ?? "index, follow, max-image-preview:large";

export const getSocialImage = () => absoluteUrl(SITE.defaultImage);

export const serializeStructuredData = (data) =>
  JSON.stringify(data).replace(/</g, "\\u003c");
