import cowsayQuotes from '~/data/cowsay.json';

export function useQuoteOfTheDay() {
  const quoteOfTheDay = useState('quote-of-the-day', () => {
    const day = Math.floor(Date.now() / 86_400_000);
    return [{ q: cowsayQuotes[day % cowsayQuotes.length]!, a: 'Cowsay' }];
  });

  return { quoteOfTheDay: readonly(quoteOfTheDay) };
}
