import ColorThief from 'colorthief';
import chroma from 'chroma-js';

const extract = (imgElement) => {
  const colorThief = new ColorThief();
  const palette: Array<string> = colorThief.getPalette(imgElement, 5)
    .map((c) => chroma(c[0], c[1], c[2]).hex())
    .sort((a, b) => chroma(a).luminance() - chroma(b).luminance());
  const lum = palette.reduce((r, color) => r + chroma(color).luminance(), 0) / 5;

  const col = palette.reduce((r, c) => {
    const s = chroma(c).hsv()[1];
    return s > r.s ? { s, c } : r;
  }, { s: 0, c: '#fff' });

  console.log('lumin', lum, col);
  let theme = 'dark';
  const color = col.c;
  if (lum > 0.3) {
    theme = 'light';
  } else {
    theme = 'dark';
  }

  const colors = {
    imgColor: palette[2], palette, theme, color,
  };
  console.log('colors', colors);
  return colors;
};

export default {
  extract,
};
