import cowsayQuotes from '~/data/cowsay.json';
interface Quote {
  q: string;
  a: string;
}

interface CachedQuote {
  data: Quote[];
  timestamp: string;
}

const CACHE_KEY = 'quote-of-the-day';
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 horas em milissegundos

function getRandomCowsayQuote(): Quote {
  const randomIndex = Math.floor(Math.random() * cowsayQuotes.length);
  return {
    q: cowsayQuotes[randomIndex] as string,
    a: 'Cowsay',
  };
}

export function useQuoteOfTheDay() {
  const quoteOfTheDay = ref<Quote[]>([{ q: 'Pensando...', a: 'Desconhecido' }]);

  function getCachedQuote(): CachedQuote | null {
    if (import.meta.server || typeof window === 'undefined') return null;
    
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;
      
      return JSON.parse(cached) as CachedQuote;
    } catch (error) {
      if (import.meta.dev) {
        console.error('Erro ao ler cache:', error);
      }
      return null;
    }
  }

  function isCacheValid(cached: CachedQuote): boolean {
    const cachedTimestamp = new Date(cached.timestamp).getTime();
    const now = Date.now();
    const difference = now - cachedTimestamp;
    
    return difference < CACHE_DURATION_MS;
  }

  function saveCache(data: Quote[]): void {
    if (import.meta.server || typeof window === 'undefined') return;
    
    try {
      const cache: CachedQuote = {
        data,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch (error) {
      if (import.meta.dev) {
        console.error('Erro ao salvar cache:', error);
      }
    }
  }

  async function fetchQuote(): Promise<Quote[]> {
    try {
      const response = await $fetch<Quote[]>('https://zenquotes.io/api/today', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      
      if (Array.isArray(response) && response.length > 0) {
        // Verifica se a resposta não é um erro da API
        const quote = response[0];
        if (quote?.q?.includes('Too many requests') || quote?.q?.includes('auth key')) {
          throw new Error('Limite de requisições da API excedido');
        }
        
        saveCache(response);
        return response;
      }
      
      throw new Error('Resposta inválida da API');
    } catch (error: any) {
      if (import.meta.dev) {
        console.error('Erro ao buscar citação:', error);
        console.error('Detalhes:', {
          message: error?.message,
          status: error?.status,
          statusText: error?.statusText,
        });
      }
      // Retorna uma citação aleatória do cowsay como fallback
      return [getRandomCowsayQuote()];
    }
  }

  async function loadQuote(): Promise<void> {
    if (import.meta.server) return;
    
    const cached = getCachedQuote();
    
    if (cached && isCacheValid(cached)) {
      quoteOfTheDay.value = cached.data;
      return;
    }
    
    // Tenta buscar nova citação
    const newQuote = await fetchQuote();
    
    // Se a requisição falhou mas há cache (mesmo que inválido), usa o cache como fallback
    // Caso contrário, usa a citação do cowsay que já foi retornada em fetchQuote
    if (cached && newQuote[0]?.a === 'Cowsay') {
      if (import.meta.dev) {
        console.warn('Usando cache inválido como fallback devido a erro na API');
      }
      quoteOfTheDay.value = cached.data;
    } else {
      quoteOfTheDay.value = newQuote;
    }
  }

  onMounted(() => {
    if (import.meta.client) {
      loadQuote();
    }
  });

  return {
    quoteOfTheDay: readonly(quoteOfTheDay),
    loadQuote,
    fetchQuote,
  };
}

