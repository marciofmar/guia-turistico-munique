/**
 * Gera arquivos WAV de teste para os 3 POIs do roteiro teste-local.
 * Cada arquivo é um tom de 3 segundos (440 Hz), suficiente para verificar
 * que o app dispara o áudio ao se aproximar do POI.
 * Executar: node generate_test_audio.cjs
 */
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'public', 'media', 'routes', 'teste-local', 'audio');
fs.mkdirSync(OUT_DIR, { recursive: true });

const SAMPLE_RATE = 44100;
const CHANNELS = 1;
const BIT_DEPTH = 16;
const DURATION_SECONDS = 3;

function generateWAV(frequency, durationSec) {
  const numSamples = SAMPLE_RATE * durationSec;
  const dataSize = numSamples * CHANNELS * (BIT_DEPTH / 8);
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0, 'ascii');
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8, 'ascii');

  // fmt chunk
  buffer.write('fmt ', 12, 'ascii');
  buffer.writeUInt32LE(16, 16);           // chunk size
  buffer.writeUInt16LE(1, 20);            // PCM format
  buffer.writeUInt16LE(CHANNELS, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * CHANNELS * (BIT_DEPTH / 8), 28);
  buffer.writeUInt16LE(CHANNELS * (BIT_DEPTH / 8), 32);
  buffer.writeUInt16LE(BIT_DEPTH, 34);

  // data chunk
  buffer.write('data', 36, 'ascii');
  buffer.writeUInt32LE(dataSize, 40);

  // PCM samples — fade in/out to avoid click
  const fadeSamples = Math.floor(SAMPLE_RATE * 0.05);
  for (let i = 0; i < numSamples; i++) {
    let amp = 0.5;
    if (i < fadeSamples) amp *= i / fadeSamples;
    else if (i > numSamples - fadeSamples) amp *= (numSamples - i) / fadeSamples;
    const sample = Math.round(amp * 32767 * Math.sin(2 * Math.PI * frequency * i / SAMPLE_RATE));
    buffer.writeInt16LE(Math.max(-32768, Math.min(32767, sample)), 44 + i * 2);
  }

  return buffer;
}

const audios = [
  { id: 'armazem-araguaia', freq: 440 },   // Lá (A4)
  { id: 'armazem-pau-ferro', freq: 554 },  // Dó# (C#5)
  { id: 'hortifruti-tres-rios', freq: 659 }, // Mi (E5)
];

for (const { id, freq } of audios) {
  const wav = generateWAV(freq, DURATION_SECONDS);
  const filePath = path.join(OUT_DIR, `${id}.wav`);
  fs.writeFileSync(filePath, wav);
  console.log(`🔊  ${id}.wav — ${freq} Hz, ${DURATION_SECONDS}s`);
}

console.log(`\nArquivos criados em: ${OUT_DIR}`);
