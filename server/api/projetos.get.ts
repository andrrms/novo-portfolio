/**
 * Cards de projeto da home. Consultado no servidor: no navegador, o Nuxt Content baixaria um SQLite
 * em WASM (~1 MB) para ler o conteúdo, ao voltar para a home vindo da página de um projeto.
 */
export default defineEventHandler(event =>
  queryCollection(event, 'projetos').order('order', 'ASC').select('path', 'stem', 'title', 'description', 'host', 'tags').all());
