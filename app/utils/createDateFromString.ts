/**
 * Cria um objeto Date a partir de uma string no formato 'YYYY-MM-DD'.
 * @param dateString A string de data a ser convertida.
 * @returns Um objeto Date representando a string de data fornecida.
 */
export default (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(Date.UTC(year!, month! - 1, day || 1, 12));
};
