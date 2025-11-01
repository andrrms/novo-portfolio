/**
 * Calcula a diferença entre duas datas e retorna uma string legível em anos e meses em pt-BR.
 * @param firstDate Data inicial no formato ISO (YYYY-MM-DD).
 * @param secondDate Data final no formato ISO (YYYY-MM-DD). Padrão é a data atual.
 * @returns String representando a diferença em anos e meses em pt-BR.
 */
export default (firstDate: string, secondDate: string = new Date().toISOString()) => {
  const start = new Date(firstDate);
  const end = new Date(secondDate);

  const totalMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  let result = '';
  if (years > 0) {
    result += `${years} ano${years > 1 ? 's' : ''}`;
  }
  if (months > 0) {
    if (years > 0) result += ' e ';
    result += `${months} m${months > 1 ? 'e' : 'ê'}s${months > 1 ? 'es' : ''}`;
  }

  return result;
}
