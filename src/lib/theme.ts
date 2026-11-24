export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";

/**
 * Runs in <head> before first paint: stored choice → light.
 * Kept as a plain string so it can be inlined without a bundle.
 */
export const themeScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t="light"}d.dataset.theme=t}catch(e){d.dataset.theme="light"}})()`;
