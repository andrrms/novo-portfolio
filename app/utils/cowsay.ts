const DEFAULT_WIDTH = '30ch';
const MIN_CONTAINER_WIDTH = 8;

const COW_TEMPLATE = [
  '        \\   ^__^',
  '         \\  (oo)\\_______',
  '            (__)\\       )\\/\\\\',
  '                ||----w |',
  '                ||     ||',
] as const;

const parseWidth = (width: string | number | undefined): number => {
  if (typeof width === 'number' && Number.isFinite(width)) {
    return Math.floor(width);
  }

  if (typeof width === 'string') {
    const match = width.match(/-?\d+(?:\.\d+)?/);
    if (match) {
      return Math.floor(Number(match[0]));
    }
  }

  return 30;
};

const wrapSegment = (segment: string, maxWidth: number): string[] => {
  if (maxWidth <= 0) {
    return [''];
  }

  if (segment.length === 0) {
    return [''];
  }

  const words = segment.split(/\s+/).filter(Boolean);
  if (!words.length) {
    return [''];
  }

  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if (!currentLine) {
      if (word.length <= maxWidth) {
        currentLine = word;
        continue;
      }

      let remaining = word;
      while (remaining.length > maxWidth) {
        lines.push(remaining.slice(0, maxWidth));
        remaining = remaining.slice(maxWidth);
      }
      currentLine = remaining;
      continue;
    }

    const testLine = `${currentLine} ${word}`;
    if (testLine.length <= maxWidth) {
      currentLine = testLine;
      continue;
    }

    lines.push(currentLine);

    if (word.length <= maxWidth) {
      currentLine = word;
      continue;
    }

    let remaining = word;
    while (remaining.length > maxWidth) {
      lines.push(remaining.slice(0, maxWidth));
      remaining = remaining.slice(maxWidth);
    }
    currentLine = remaining;
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.length ? lines : [''];
};

const centerLine = (content: string, width: number): string => {
  if (content.length >= width) {
    return content;
  }

  const totalPadding = width - content.length;
  const leftPadding = Math.floor(totalPadding / 2);
  const rightPadding = totalPadding - leftPadding;

  return `${' '.repeat(leftPadding)}${content}${' '.repeat(rightPadding)}`;
};

const buildBalloon = (lines: string[], contentWidth: number): string[] => {
  if (!lines.length) {
    return [`< ${centerLine('', contentWidth)} >`];
  }

  if (lines.length === 1) {
    return [`< ${centerLine(lines[0] ?? '', contentWidth)} >`];
  }

  const firstLine = lines[0] ?? '';
  const lastLine = lines[lines.length - 1] ?? '';
  const middleLines = lines.slice(1, -1);

  return [
    `/ ${centerLine(firstLine, contentWidth)} \\`,
    ...middleLines.map(line => `| ${centerLine(line, contentWidth)} |`),
    `\\ ${centerLine(lastLine, contentWidth)} /`,
  ];
};

/**
 * Gera a arte ASCII do Cowsay com o texto centralizado e largura configurável.
 *
 * @param text Texto que a vaca deve "dizer". Use `\n` para linhas manuais.
 * @param width Largura máxima disponível para o balão, ex.: `"30ch"`.
 * @returns Arte ASCII da vaca com balão centralizado.
 *
 * @example
 * ```ts
 * generateCowsay('Olá, mundo!');
 * ```
 *
 * @example
 * ```ts
 * generateCowsay('Primeira linha\nSegunda linha', '50ch');
 * ```
 */
export const generateCowsay = (text: string, width: string | number = DEFAULT_WIDTH): string => {
  const parsedWidth = Math.max(MIN_CONTAINER_WIDTH, parseWidth(width));
  const maxContentWidth = Math.max(1, parsedWidth - 4);

  const wrappedLines = text
    .split('\n')
    .flatMap(segment => wrapSegment(segment, maxContentWidth));

  const safeLines = wrappedLines.length ? wrappedLines : [''];
  const longestLine = safeLines.reduce((max, line) => Math.max(max, line.length), 0);
  const contentWidth = Math.max(1, Math.min(maxContentWidth, longestLine));
  const balloonWidth = contentWidth + 4;

  const leftPad = parsedWidth > balloonWidth ? Math.floor((parsedWidth - balloonWidth) / 2) : 0;
  const horizontalPad = ' '.repeat(leftPad);

  const topBorder = `${horizontalPad} ${'_'.repeat(contentWidth + 2)} `;
  const bottomBorder = `${horizontalPad} ${'-'.repeat(contentWidth + 2)} `;

  const balloonLines = buildBalloon(safeLines, contentWidth).map(line => `${horizontalPad}${line}`);

  const cowWidth = COW_TEMPLATE.reduce((max, line) => Math.max(max, line.length), 0);
  const cowLeftPad = parsedWidth > cowWidth ? Math.floor((parsedWidth - cowWidth) / 2) : 0;
  const cowPad = ' '.repeat(cowLeftPad);
  const cowLines = COW_TEMPLATE.map(line => `${cowPad}${line}`);

  return [topBorder, ...balloonLines, bottomBorder, ...cowLines].join('\n');
};

export default generateCowsay;

