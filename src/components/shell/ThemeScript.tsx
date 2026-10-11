/**
 * Applies the saved theme before first paint to avoid a flash.
 * See node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
 */
export const THEME_STORAGE_KEY = "theme";

export function ThemeScript() {
  const script = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
