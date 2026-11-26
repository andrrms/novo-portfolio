type ProjectPart = 'frame' | 'cover' | 'logo' | 'title' | 'description' | 'tags' | 'host';

/**
 * Estilo que dá a uma parte do projeto o mesmo nome de view transition no card da home e na página
 * dele: na troca de página, cada parte sai do card e vai para o lugar dela (e volta). A classe
 * agrupa as partes para o CSS da transição (tailwind.css).
 */
export function projectTransition(slug: string, part: ProjectPart) {
  return {
    viewTransitionName: `project-${part}-${slug}`,
    viewTransitionClass: `project-${part}`,
  };
}
