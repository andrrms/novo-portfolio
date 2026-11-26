import { TIME_ZONE } from '~/data/now';

const hourFormat = new Intl.DateTimeFormat('en-US', { hour: 'numeric', hourCycle: 'h23', timeZone: TIME_ZONE });

/**
 * Easter egg da madrugada. Entre 0h e 5h em Campo Grande, num computador, o botão "dark mode" da faixa
 * 88×31 solta uma cordinha de luminária (HomeLamp); puxar a cordinha apaga a luz e revela as pichações
 * em tinta UV (UiUvMark). Em dev, `?madrugada` na URL libera a qualquer hora.
 */
export function useLamp() {
  const cord = useState('lamp-cord', () => false);
  const dark = useState('lamp-dark', () => false);
  return { cord, dark };
}

/** Só no cliente: depende da hora e do dispositivo de quem visita. */
export function isLampAwake() {
  const desktop = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)').matches;
  const night = Number(hourFormat.format(new Date())) < 5
    || (import.meta.dev && new URLSearchParams(location.search).has('madrugada'));
  return desktop && night;
}
