fetch('assets/scripts/ogConfig.json')
  .then(response => response.json())
  .then(config => {
    const { title, description, url, image, type } = config;
    document.querySelector('meta[property="og:title"]').setAttribute('content', title);
    document.querySelector('meta[property="og:description"]').setAttribute('content', description);
    document.querySelector('meta[property="og:url"]').setAttribute('content', url);
    document.querySelector('meta[property="og:image"]').setAttribute('content', image);
    document.querySelector('meta[property="og:type"]').setAttribute('content', type);
    
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, 32, 32);
    ctx.fillStyle = 'white';
    ctx.font = '14px Arial';
    ctx.fillText('DS', 6, 20);

    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = dataURL;
    document.head.appendChild(link);
  })
  .catch(console.error);