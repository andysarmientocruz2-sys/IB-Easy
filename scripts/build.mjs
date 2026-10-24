import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const projectLicense = await readFile(path.join(root, 'LICENSE'), 'utf8');
let output = await readFile(path.join(root, 'worker/index.js'), 'utf8');
const assets = {
  __IB_EASY_HTML__: 'web/index.html',
  __IB_EASY_CSS__: 'web/coar.css',
  __IB_EASY_CHAT_CSS__: 'web/chat.css',
  __IB_EASY_JS__: 'web/coar-app.js',
  __IB_EASY_FORMAT_JS__: 'web/chat-format.js',
  __IB_EASY_LEARNING_JS__: 'web/learning-data.js',
  __IB_EASY_COURSE_JS__: 'web/course-data.js',
  __IB_EASY_EXAM_JS__: 'web/exam-data.js',
  __IB_EASY_DEEP_HISTORY_JS__: 'web/deep-history-math.js',
  __IB_EASY_DEEP_CORE_JS__: 'web/deep-core.js',
  __IB_EASY_DEEP_SUBJECTS_JS__: 'web/deep-subjects.js',
  __IB_EASY_DEEP_MORE_JS__: 'web/deep-more.js',
  __IB_EASY_EXTRA_CORE_JS__: 'web/deep-extra-core.js',
  __IB_EASY_EXTRA_DIGITAL_JS__: 'web/deep-extra-digital-history.js',
  __IB_EASY_EXTRA_LANGUAGES_JS__: 'web/deep-extra-languages-business.js',
  __IB_EASY_AREAS_JS__: 'web/area-data.js',
  __IB_EASY_BIO_CDES_JS__: 'web/deep-sciences-bio-cdes.js',
  __IB_EASY_CHEM_PHYSICS_JS__: 'web/deep-sciences-chem-physics.js',
  __IB_EASY_ENV_ARTS_JS__: 'web/deep-environment-arts.js',
  __IB_EASY_AREA_TOOLS_JS__: 'web/area-tools.js',
  __IB_EASY_STUDIO_JS__: 'web/learning-studio.js',
  __IB_EASY_ENGINE_JS__: 'web/learning-engine.js',
  __IB_EASY_WORKSPACE_JS__: 'web/study-workspace.js',
  __IB_EASY_MARKED_JS__: 'node_modules/marked/lib/marked.umd.js',
  __IB_EASY_PURIFY_JS__: 'node_modules/dompurify/dist/purify.min.js',
};
const source = {};
for (const [placeholder, filename] of Object.entries(assets)) {
  source[placeholder] = await readFile(path.join(root, filename), 'utf8');
  const value = JSON.stringify(source[placeholder]);
  if (!output.includes(placeholder)) throw new Error('Missing asset placeholder');
  output = output.replace(placeholder, () => value);
}
await mkdir(path.join(root, 'dist'), { recursive: true });
await writeFile(path.join(root, 'dist/worker.js'), '/*\n' + projectLicense + '\n*/\n' + output);
// A portable copy for reviewing the design without installing or running Node.
// This HTML is not the deployment artifact; Cloudflare uses worker.js.
let portable = source.__IB_EASY_HTML__;
const inline = {
  '/style.css': ['style', source.__IB_EASY_CSS__],
  '/chat.css': ['style', source.__IB_EASY_CHAT_CSS__],
  '/vendor/marked.js': ['script', source.__IB_EASY_MARKED_JS__],
  '/vendor/purify.js': ['script', source.__IB_EASY_PURIFY_JS__],
  '/chat-format.js': ['script', source.__IB_EASY_FORMAT_JS__],
  '/learning-data.js': ['script', source.__IB_EASY_LEARNING_JS__],
  '/course-data.js': ['script', source.__IB_EASY_COURSE_JS__],
  '/exam-data.js': ['script', source.__IB_EASY_EXAM_JS__],
  '/deep-history-math.js': ['script', source.__IB_EASY_DEEP_HISTORY_JS__],
  '/deep-core.js': ['script', source.__IB_EASY_DEEP_CORE_JS__],
  '/deep-subjects.js': ['script', source.__IB_EASY_DEEP_SUBJECTS_JS__],
  '/deep-more.js': ['script', source.__IB_EASY_DEEP_MORE_JS__],
  '/deep-extra-core.js': ['script', source.__IB_EASY_EXTRA_CORE_JS__],
  '/deep-extra-digital-history.js': ['script', source.__IB_EASY_EXTRA_DIGITAL_JS__],
  '/deep-extra-languages-business.js': ['script', source.__IB_EASY_EXTRA_LANGUAGES_JS__],
  '/area-data.js': ['script', source.__IB_EASY_AREAS_JS__],
  '/deep-sciences-bio-cdes.js': ['script', source.__IB_EASY_BIO_CDES_JS__],
  '/deep-sciences-chem-physics.js': ['script', source.__IB_EASY_CHEM_PHYSICS_JS__],
  '/deep-environment-arts.js': ['script', source.__IB_EASY_ENV_ARTS_JS__],
  '/area-tools.js': ['script', source.__IB_EASY_AREA_TOOLS_JS__],
  '/learning-studio.js': ['script', source.__IB_EASY_STUDIO_JS__],
  '/learning-engine.js': ['script', source.__IB_EASY_ENGINE_JS__],
  '/study-workspace.js': ['script', source.__IB_EASY_WORKSPACE_JS__],
  '/app.js': ['script', source.__IB_EASY_JS__],
};
for (const [route, [tag, body]] of Object.entries(inline)) {
  const target = tag === 'style'
    ? '<link rel="stylesheet" href="' + route + '?v=090">'
    : '<script src="' + route + '?v=090"></script>';
  if (!portable.includes(target)) throw new Error('Missing portable asset: ' + route);
  // Escape literal HTML sentinels, including closing document tags that preview
  // live-reload servers otherwise inject into inside a library's template string.
  // WHATWG: restrictions for contents of script elements; no eval is introduced.
  const safeBody = tag === 'script'
    ? body.replace(/<!--|<\/?(?:script|head|body|html)(?=[\s>])/gi, match => '\\x3C' + match.slice(1))
    : body;
  portable = portable.replace(target, () => '<' + tag + '>' + safeBody + '</' + tag + '>');
}
await writeFile(path.join(root, 'dist/IB-Easy-COAR.html'), '<!--\n' + projectLicense + '\n-->\n' + portable);
console.log('Cloudflare Worker built: dist/worker.js (no secrets included)');
