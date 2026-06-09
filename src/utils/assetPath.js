// Vite serves public assets under BASE_URL in production (for example /My-Portfolio/ on GitHub Pages).
export const assetPath = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
