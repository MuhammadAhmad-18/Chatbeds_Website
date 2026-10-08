(async()=>{
 const paths=window.__marketingRoutes || ['/'];
 const frame=document.createElement('iframe');
 frame.setAttribute('aria-hidden','true');
 frame.style.cssText=`position:fixed;left:-10000px;top:0;width:${innerWidth}px;height:${innerHeight}px;border:0;`;
 document.body.append(frame);
 const results=[];
 try {
  for(const path of paths) {
   await new Promise((resolve,reject)=>{const timeout=setTimeout(()=>reject(new Error('Timed out loading '+path)),15000);frame.onload=()=>{clearTimeout(timeout);resolve()};frame.src=path});
   await frame.contentDocument.fonts.ready;
   await new Promise(resolve=>setTimeout(resolve,180));
   const doc=frame.contentDocument,win=frame.contentWindow;
   const ids=[...doc.querySelectorAll('[id]')].map(el=>el.id);
   const duplicates=[...new Set(ids.filter((id,index)=>ids.indexOf(id)!==index))];
   const actionButtons=[...doc.querySelectorAll('.nav-actions > a,.nav-actions > button:not(.menu-toggle)')].map(el=>({label:el.textContent.trim(),width:Math.round(el.getBoundingClientRect().width),height:Math.round(el.getBoundingClientRect().height)}));
   results.push({path,width:win.innerWidth,pageWidth:doc.documentElement.scrollWidth,overflow:doc.documentElement.scrollWidth>win.innerWidth,duplicateIds:duplicates,mainCount:doc.querySelectorAll('main').length,actionButtons});
  }
 } finally {frame.remove()}
 const failures=results.filter(row=>row.overflow||row.duplicateIds.length||row.mainCount!==1||row.actionButtons.some(action=>action.height<40||action.width===0));
 return JSON.stringify({viewport:[innerWidth,innerHeight],passed:failures.length===0,failures,results});
})()
