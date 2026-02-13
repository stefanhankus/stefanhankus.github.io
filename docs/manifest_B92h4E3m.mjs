import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import 'piccolore';
import { N as NOOP_MIDDLEWARE_HEADER, h as decodeKey } from './chunks/astro/server_Ds8vH9We.mjs';
import 'clsx';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///media/Dane/Dokumenty/Programowanie/stefan-hankus-page/astro/","cacheDir":"file:///media/Dane/Dokumenty/Programowanie/stefan-hankus-page/astro/node_modules/.astro/","outDir":"file:///media/Dane/Dokumenty/Programowanie/stefan-hankus-page/github/docs/","srcDir":"file:///media/Dane/Dokumenty/Programowanie/stefan-hankus-page/astro/src/","publicDir":"file:///media/Dane/Dokumenty/Programowanie/stefan-hankus-page/astro/public/","buildClientDir":"file:///media/Dane/Dokumenty/Programowanie/stefan-hankus-page/github/docs/client/","buildServerDir":"file:///media/Dane/Dokumenty/Programowanie/stefan-hankus-page/github/docs/server/","adapterName":"","routes":[{"file":"file:///media/Dane/Dokumenty/Programowanie/stefan-hankus-page/github/docs/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/media/Dane/Dokumenty/Programowanie/stefan-hankus-page/astro/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-manifest":"manifest_B92h4E3m.mjs","/media/Dane/Dokumenty/Programowanie/stefan-hankus-page/astro/src/images/gallery/17.jpg":"chunks/17_BcdGORtv.mjs","/media/Dane/Dokumenty/Programowanie/stefan-hankus-page/astro/src/images/gallery/18.jpg":"chunks/18_bPJVl2c1.mjs","/media/Dane/Dokumenty/Programowanie/stefan-hankus-page/astro/src/images/gallery/5c7176b2-cc3b-4f01-ad82-396c72801ee6_dziadek.jpg":"chunks/5c7176b2-cc3b-4f01-ad82-396c72801ee6_dziadek_BEi56-4K.mjs","/media/Dane/Dokumenty/Programowanie/stefan-hankus-page/astro/src/images/gallery/7.jpg":"chunks/7_2DrWvPKY.mjs","/media/Dane/Dokumenty/Programowanie/stefan-hankus-page/astro/src/images/gallery/Bezkrwawe_ łowy.jpg":"chunks/Bezkrwawe_ łowy_jCRBlscT.mjs","/media/Dane/Dokumenty/Programowanie/stefan-hankus-page/astro/src/images/gallery/Dziadek2_X.jpg":"chunks/Dziadek2_X_B-XWemnb.mjs","/media/Dane/Dokumenty/Programowanie/stefan-hankus-page/astro/src/images/gallery/Portfel_1.jpg":"chunks/Portfel_1_Bj0X1xk1.mjs","/media/Dane/Dokumenty/Programowanie/stefan-hankus-page/astro/src/images/gallery/dziadek z papierosem.jpg":"chunks/dziadek z papierosem_D4HjxkqP.mjs","/media/Dane/Dokumenty/Programowanie/stefan-hankus-page/astro/src/images/gallery/zapalniczka _3.jpg":"chunks/zapalniczka _3_DZFjDc1D.mjs","/media/Dane/Dokumenty/Programowanie/stefan-hankus-page/astro/src/images/gallery/zapalniczka _4.jpg":"chunks/zapalniczka _4_UP6w_osD.mjs","/media/Dane/Dokumenty/Programowanie/stefan-hankus-page/astro/src/images/gallery/łyżka_awers z napisem Ural_całość.jpg":"chunks/łyżka_awers z napisem Ural_całość_Dcu0Pw3k.mjs","/media/Dane/Dokumenty/Programowanie/stefan-hankus-page/astro/src/images/gallery/łyżka_rewersz napisem Ural.jpg":"chunks/łyżka_rewersz napisem Ural_DDgX8vcK.mjs","/media/Dane/Dokumenty/Programowanie/stefan-hankus-page/astro/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.ClXrCzw1.js","/media/Dane/Dokumenty/Programowanie/stefan-hankus-page/astro/node_modules/photoswipe/dist/photoswipe.esm.js":"_astro/photoswipe.esm.CKV1Bsxh.js","/media/Dane/Dokumenty/Programowanie/stefan-hankus-page/astro/src/components/Gallery3.astro?astro&type=script&index=0&lang.ts":"_astro/Gallery3.astro_astro_type_script_index_0_lang.BtsmLUdM.js","/media/Dane/Dokumenty/Programowanie/stefan-hankus-page/astro/src/components/Gallery.astro?astro&type=script&index=0&lang.ts":"_astro/Gallery.astro_astro_type_script_index_0_lang.DVnp0wZX.js","lightgallery":"_astro/_astro-entry_lightgallery.CttfBoKA.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/media/Dane/Dokumenty/Programowanie/stefan-hankus-page/astro/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","const n={root:null,rootMargin:\"0px\",threshold:.1},o=new IntersectionObserver(t=>{t.forEach(e=>{e.isIntersecting&&(e.target.classList.add(\"is-visible\"),o.unobserve(e.target))})},n);document.addEventListener(\"DOMContentLoaded\",()=>{document.querySelectorAll(\".animate-on-scroll\").forEach(e=>o.observe(e))});"]],"assets":["/file:///media/Dane/Dokumenty/Programowanie/stefan-hankus-page/github/docs/index.html"],"buildFormat":"directory","checkOrigin":false,"allowedDomains":[],"serverIslandNameMap":[],"key":"29eMNRs0HkW/SXkta4Ad/xKD+hsFD2WA0nPINGZI340="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
