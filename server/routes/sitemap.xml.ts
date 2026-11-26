export default defineEventHandler(async (event) => {
  const { siteUrl } = useRuntimeConfig(event).public;
  const projects = await queryCollection(event, 'projetos').select('path').all();
  const urls = ['', ...projects.map(project => project.path)]
    .map(path => `<url><loc>${siteUrl}${path}</loc></url>`)
    .join('');

  setHeader(event, 'content-type', 'application/xml; charset=utf-8');
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
});
