import chroma from 'chroma-js';

const emptyBg = () => '#fff' //'linear-gradient(180deg, rgba(8, 54, 107, 0.765), rgba(8, 54, 107, 0.4) 50%, rgba(8, 54, 107, 0.5) 100%), url(/static/cover.jpg) center center / cover, #08366B';

export default {
  generate(model, thumb = false) {
    const { coverImage, colors } = model;
    if (!coverImage) return colors?.theme === 'dark' ? '#000' : '#fff';
    const imageUrl = thumb ? coverImage.thumb : coverImage.image;
    const p = colors.palette;
    if (colors.theme === 'light') {
      const c1 = chroma(p[4]).alpha(0.6);
      const c2 = chroma(p[3]).alpha(0.1);
      return `linear-gradient(180deg, ${c1} 10%, ${c2} 30%), url(${imageUrl}) center center / cover, ${colors.imgColor}`;
    }
    const c1 = chroma(p[0]).alpha(0.6);
    const c2 = chroma(p[1]).alpha(0.1);
    return `linear-gradient(180deg, ${c1} 10%, ${c2} 30%), url(${imageUrl}) center center / cover, ${colors.imgColor}`;
  },
  box(model) {
    if (!model.colors) return '#fff';

    if (!model.colors.palette?.length) return model.colors?.theme == 'light' ? '#fff' : '#000';
    if (model.colors.theme === 'light') {
      return chroma(model.colors.palette[2]).alpha(0.8);
    }
    return chroma(model.colors.palette[2]).alpha(0.7);
  },
};
