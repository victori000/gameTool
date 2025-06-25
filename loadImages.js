export default function loadImages(paths) {
  const entries= Object.entries(paths);
  const promises= entries.map(([name, src]) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve([name, img]);
      img.onerror = () => reject(`Error loading ${src}`);
    })
  );
  return Promise.all(promises).then(Object.fromEntries);
}