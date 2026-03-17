const imgs = document.getElementsByTagName("img");

console.log(imgs);

const images = [
  "content/images/zero-two-1.png",
  "content/images/zero-two-2.png",
];

for (let img of imgs) {
  const x = img.getBoundingClientRect().x;
  const y = img.getBoundingClientRect().y;

  const width = img.getBoundingClientRect().width;
  const height = img.getBoundingClientRect().height;

  const parent = img.parentElement;

  if (
    x < 0 ||
    y < 0 ||
    x + width > window.innerWidth ||
    y + height > window.innerHeight
  ) {
    parent.appendChild(document.createElement("img")).src =
      "file:///home/mysterio/Projects/FireFox/Addons/ZeroTwoEverywhere/content/" +
      images[Math.floor(Math.random() * images.length)];
  }
}
