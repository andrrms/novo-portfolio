/**
 * Sons da luminária, sintetizados na hora (sem arquivos): o estalo do interruptor de cordinha e o
 * zumbido do reator da luz negra. Precisa ser criado dentro de um gesto (clique, arraste), senão o
 * navegador deixa o áudio mudo.
 */
export function createLampAudio() {
  const context = new AudioContext();
  const master = context.createGain();
  master.gain.value = 0.6;
  master.connect(context.destination);

  const noise = context.createBuffer(1, context.sampleRate, context.sampleRate);
  const samples = noise.getChannelData(0);
  for (let index = 0; index < samples.length; index++) samples[index] = Math.random() * 2 - 1;

  function burst(at: number, { gain, frequency, decay }: { gain: number; frequency: number; decay: number }) {
    const source = context.createBufferSource();
    source.buffer = noise;
    source.playbackRate.value = 0.5 + Math.random();
    const filter = context.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = frequency;
    filter.Q.value = 1.4;
    const envelope = context.createGain();
    envelope.gain.setValueAtTime(gain, at);
    envelope.gain.exponentialRampToValueAtTime(0.001, at + decay);
    source.connect(filter).connect(envelope).connect(master);
    source.start(at);
    source.stop(at + decay + 0.02);
  }

  // Zumbido: 120 Hz (rede de 60 Hz) e harmônicos, abafado como vindo de dentro da luminária.
  const hum = context.createGain();
  hum.gain.value = 0;
  const muffle = context.createBiquadFilter();
  muffle.type = 'lowpass';
  muffle.frequency.value = 1400;
  muffle.connect(hum).connect(master);
  for (const [type, frequency, gain] of [['sawtooth', 120, 0.5], ['square', 240, 0.12], ['sine', 60, 0.6]] as const) {
    const oscillator = context.createOscillator();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    const level = context.createGain();
    level.gain.value = gain;
    oscillator.connect(level).connect(muffle);
    oscillator.start();
  }

  return {
    /** Estalo duplo da cordinha: o puxão e a volta da mola. */
    click() {
      const now = context.currentTime;
      burst(now, { gain: 0.9, frequency: 3200, decay: 0.03 });
      burst(now + 0.08, { gain: 0.45, frequency: 2400, decay: 0.025 });
    },
    /** Volume do zumbido, de 0 a 1. Ligar com chiado é o tubo tentando acender. */
    buzz(level: number) {
      const now = context.currentTime;
      hum.gain.setTargetAtTime(level * 0.09, now, 0.006);
      if (level > 0.3) burst(now, { gain: 0.25 * level, frequency: 5200, decay: 0.06 });
    },
    /** O navegador pode criar o contexto suspenso; retomar dentro de um gesto libera o som. */
    resume() {
      if (context.state === 'suspended') void context.resume();
    },
    close() {
      void context.close();
    },
  };
}
