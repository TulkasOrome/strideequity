import slugify from 'slugify';

const Linker = (htmlStr) => {
  const html = document.createElement('div');
  html.innerHTML = htmlStr;
  const hTags = html.querySelectorAll('h2');
  let count = 1;
  const links = [];
  hTags.forEach((hTag) => {
    const tagContent = hTag.innerHTML;
    hTag.innerHTML = `<a class="anchor-link" href="#s${count}"><i class="fas fa-link"></i></a> ${tagContent}`;
    hTag.setAttribute('id', slugify(tagContent));
    links.push(hTag.textContent);
  });
  const content = html.innerHTML;
  return { links, content };
};

export default Linker;
