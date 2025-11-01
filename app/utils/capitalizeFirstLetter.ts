/**
 * Coloca em maiúscula a primeira letra de uma string.
 * @param str A string para capitalizar.
 * @returns A string de entrada com a primeira letra em maiúscula.
 */
export default (str: string) => {
  if (!str.trim()) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
