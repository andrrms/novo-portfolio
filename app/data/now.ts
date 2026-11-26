import photo from '~/assets/images/eu.jpg';

/** Fuso de Campo Grande: a hora da seção Agora e a madrugada do easter egg da luminária. */
export const TIME_ZONE = 'America/Campo_Grande';

/** Projeto que aparece como "construindo" na seção Agora. null esconde a linha. */
export const building: { name: string; url?: string } | null = null;

/** ID da playlist do Spotify ao lado da fita (o trecho depois de /playlist/ no link). null esconde o widget. */
export const playlist: string | null = '3MMz3LFMwBIAei0dzkZB8W';

/** Lado B da fita: a frase escrita à mão (cabe em duas linhas) e a foto colada nela. null tira a foto. */
export const sideB: { phrase: string; photo: string | null } = {
  phrase: 'Se você virou a fita, a gente ia se dar bem.',
  photo,
};
