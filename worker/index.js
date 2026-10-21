// COAR edition: self-contained learning tools. No model requests or API keys.
const assets = {
  html: __IB_EASY_HTML__,
  css: __IB_EASY_CSS__,
  chatCss: __IB_EASY_CHAT_CSS__,
  js: __IB_EASY_JS__,
  formatJs: __IB_EASY_FORMAT_JS__,
  learningJs: __IB_EASY_LEARNING_JS__,
  courseJs: __IB_EASY_COURSE_JS__,
  examJs: __IB_EASY_EXAM_JS__,
  deepHistoryJs: __IB_EASY_DEEP_HISTORY_JS__,
  deepCoreJs: __IB_EASY_DEEP_CORE_JS__,
  deepSubjectsJs: __IB_EASY_DEEP_SUBJECTS_JS__,
  deepMoreJs: __IB_EASY_DEEP_MORE_JS__,
  extraCoreJs: __IB_EASY_EXTRA_CORE_JS__,
  extraDigitalJs: __IB_EASY_EXTRA_DIGITAL_JS__,
  extraLanguagesJs: __IB_EASY_EXTRA_LANGUAGES_JS__,
  areasJs: __IB_EASY_AREAS_JS__,
  bio_cdesJs: __IB_EASY_BIO_CDES_JS__,
  chem_physicsJs: __IB_EASY_CHEM_PHYSICS_JS__,
  env_artsJs: __IB_EASY_ENV_ARTS_JS__,
  area_toolsJs: __IB_EASY_AREA_TOOLS_JS__,
  studioJs: __IB_EASY_STUDIO_JS__,
  engineJs: __IB_EASY_ENGINE_JS__,
  workspaceJs: __IB_EASY_WORKSPACE_JS__,
  markedJs: __IB_EASY_MARKED_JS__,
  purifyJs: __IB_EASY_PURIFY_JS__,
};

const headers = {
  "x-content-type-options": "nosniff",
  "referrer-policy": "no-referrer",
  "content-security-policy": "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'",
};
const json = (body, status) => new Response(JSON.stringify(body), {
  status, headers: { ...headers, "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
});
const routes = {
  "/": [assets.html, "text/html; charset=utf-8"],
  "/index.html": [assets.html, "text/html; charset=utf-8"],
  "/style.css": [assets.css, "text/css; charset=utf-8"],
  "/chat.css": [assets.chatCss, "text/css; charset=utf-8"],
  "/app.js": [assets.js, "text/javascript; charset=utf-8"],
  "/chat-format.js": [assets.formatJs, "text/javascript; charset=utf-8"],
  "/learning-data.js": [assets.learningJs, "text/javascript; charset=utf-8"],
  "/course-data.js": [assets.courseJs, "text/javascript; charset=utf-8"],
  "/exam-data.js": [assets.examJs, "text/javascript; charset=utf-8"],
  "/deep-history-math.js": [assets.deepHistoryJs, "text/javascript; charset=utf-8"],
  "/deep-core.js": [assets.deepCoreJs, "text/javascript; charset=utf-8"],
  "/deep-subjects.js": [assets.deepSubjectsJs, "text/javascript; charset=utf-8"],
  "/deep-more.js": [assets.deepMoreJs, "text/javascript; charset=utf-8"],
  "/deep-extra-core.js": [assets.extraCoreJs, "text/javascript; charset=utf-8"],
  "/deep-extra-digital-history.js": [assets.extraDigitalJs, "text/javascript; charset=utf-8"],
  "/deep-extra-languages-business.js": [assets.extraLanguagesJs, "text/javascript; charset=utf-8"],
  "/area-data.js": [assets.areasJs, "text/javascript; charset=utf-8"],
  "/deep-sciences-bio-cdes.js": [assets.bio_cdesJs, "text/javascript; charset=utf-8"],
  "/deep-sciences-chem-physics.js": [assets.chem_physicsJs, "text/javascript; charset=utf-8"],
  "/deep-environment-arts.js": [assets.env_artsJs, "text/javascript; charset=utf-8"],
  "/area-tools.js": [assets.area_toolsJs, "text/javascript; charset=utf-8"],
  "/learning-studio.js": [assets.studioJs, "text/javascript; charset=utf-8"],
  "/learning-engine.js": [assets.engineJs, "text/javascript; charset=utf-8"],
  "/study-workspace.js": [assets.workspaceJs, "text/javascript; charset=utf-8"],
  "/vendor/marked.js": [assets.markedJs, "text/javascript; charset=utf-8"],
  "/vendor/purify.js": [assets.purifyJs, "text/javascript; charset=utf-8"],
};
export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/api/mentor") {
      const origin = request.headers.get("origin");
      if (origin && origin !== url.origin) return json({ code: "invalid_origin" }, 403);
      if (request.method !== "POST") return json({ code: "method_not_allowed" }, 405);
      // A brother's key or an age checkbox does not make a school app eligible.
      // The current school edition deliberately makes no upstream request.
      return json({ code: "school_ai_paused", message: "El tutor IA no está activo en esta edición escolar. Estudio y práctica están disponibles sin API." }, 503);
    }
    if (!["GET", "HEAD"].includes(request.method)) {
      return new Response("Method not allowed", { status: 405, headers: { ...headers, allow: "GET, HEAD" } });
    }
    const asset = Object.hasOwn(routes, url.pathname) ? routes[url.pathname] : null;
    if (!asset) return new Response(request.method === "HEAD" ? null : "Not found", { status: 404, headers });
    return new Response(request.method === "HEAD" ? null : asset[0], {
      headers: { ...headers, "content-type": asset[1], "cache-control": url.pathname === "/" || url.pathname.endsWith(".html") ? "no-cache" : "public, max-age=300" },
    });
  },
};

