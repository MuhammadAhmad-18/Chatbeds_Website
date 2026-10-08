(async () => {
  const routes = new Map();
  const queue = ['/'];
  const failures = [];
  const anchorReferences = [];
  while (queue.length) {
    const path = queue.shift();
    if (routes.has(path)) continue;
    const response = await fetch(path);
    const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
    const main = doc.querySelector('main');
    const h1 = [...doc.querySelectorAll('h1')].map(el => el.textContent.trim());
    const title = doc.querySelector('title')?.textContent;
    const description = doc.querySelector('meta[name="description"]')?.content;
    routes.set(path, {path,status:response.status,h1,title,description,mainCount:doc.querySelectorAll('main').length,contentLength:main?.textContent.trim().length || 0,ids:[...doc.querySelectorAll('[id]')].map(el=>el.id)});
    if (response.status !== 200) failures.push(`${path}: HTTP ${response.status}`);
    if (h1.length !== 1) failures.push(`${path}: expected one h1, got ${h1.length}`);
    if (doc.querySelectorAll('main').length !== 1) failures.push(`${path}: expected one main`);
    if (!title || !description) failures.push(`${path}: missing title/description`);
    if (!main || main.textContent.trim().length < 160) failures.push(`${path}: page content is missing or too short`);
    for (const link of doc.querySelectorAll('header a[href],main a[href],footer a[href]')) {
      const raw = link.getAttribute('href');
      if (!raw || /^(mailto:|tel:|https?:|data:)/i.test(raw)) continue;
      const url = new URL(raw,new URL(path,location.origin));
      if (url.origin !== location.origin || /\.[a-z0-9]+$/i.test(url.pathname)) continue;
      if (!routes.has(url.pathname) && !queue.includes(url.pathname)) queue.push(url.pathname);
      if (url.hash) anchorReferences.push({from:path,path:url.pathname,id:decodeURIComponent(url.hash.slice(1))});
    }
    if (routes.size > 40) { failures.push('Unexpectedly large route crawl');break; }
  }
  for(const {from,path,id} of anchorReferences) {
    if(!routes.get(path)?.ids.includes(id)) failures.push(`${from}: broken anchor ${path}#${id}`);
  }
  const entries=[...routes.values()].map(entry=>{
    const result={...entry};
    delete result.ids;
    return result;
  });
  for(const field of ['title','h1']) {
    const seen=new Map();
    for(const entry of entries) {
      const text=String(entry[field]);
      if(seen.has(text))failures.push(`Duplicate ${field}: ${seen.get(text)} and ${entry.path}`);
      seen.set(text,entry.path);
    }
  }
  window.__marketingRoutes = entries.map(entry => entry.path); return JSON.stringify({passed:failures.length===0,routeCount:routes.size,failures,routes:entries});
})()

