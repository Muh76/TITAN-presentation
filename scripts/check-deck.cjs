const{chromium}=require('playwright-chromium');const fs=require('fs');
(async()=>{fs.mkdirSync('tmp/qa',{recursive:true});const b=await chromium.launch({headless:true});const p=await b.newPage({viewport:{width:1280,height:720}});const issues=[],stats=[];let count=0;
const total=1+(fs.readFileSync(process.env.DECK || 'TITAN.md','utf8').replace(/\r\n/g,'\n').match(/\n---\nlayout: default/g)||[]).length;
for(let n=1;n<=total;n++){
 await p.goto(`http://localhost:${process.env.PORT || 3030}/${n}?clicks=0`,{waitUntil:'networkidle'});
 const sel=`.slidev-page-${n} .slidev-layout`;await p.locator(sel).waitFor();
 await p.locator(sel+' img').evaluateAll(es=>Promise.all(es.map(e=>e.decode().catch(()=>{}))));
 const max=await p.locator(sel).evaluate(e=>Math.max(0,...[...e.querySelectorAll('[data-slidev-clicks-start]')].map(x=>Number(x.getAttribute('data-slidev-clicks-start')))));
 const base=await p.locator(sel).evaluate(e=>[...e.querySelectorAll('h1,h2,p,figure,.node,.bar-row')].map(x=>{let r=x.getBoundingClientRect();return [r.x,r.y,r.width,r.height]}));
 for(let k=0;k<=max;k++){
  if(k){await p.keyboard.press('ArrowRight');await p.waitForTimeout(270)}
  const result=await p.locator(sel).evaluate(e=>{const root=e.getBoundingClientRect();const bad=[];for(const x of e.querySelectorAll('h1,h2,p,figure,table,.flow,.definitions,.takeaway,.future,.comparison,.similarities,.numbers,.branch')){const r=x.getBoundingClientRect();if(r.width&&(r.bottom>root.top+672||r.right>root.right-24||r.left<root.left+20))bad.push({tag:x.tagName,cls:x.className,text:x.textContent.slice(0,65),bottom:Math.round(r.bottom-root.top),right:Math.round(r.right-root.left)});}return {bad,broken:[...e.querySelectorAll('img')].filter(i=>!i.naturalWidth).map(i=>i.src),geometry:[...e.querySelectorAll('h1,h2,p,figure,.node,.bar-row')].map(x=>{let r=x.getBoundingClientRect();return[r.x,r.y,r.width,r.height]})}});
  if(result.bad.length||result.broken.length)issues.push({slide:n,click:k,...result,geometry:undefined});
  if(JSON.stringify(result.geometry)!==JSON.stringify(base))issues.push({slide:n,click:k,error:'layout-shift'});
  await p.screenshot({path:`tmp/qa/${String(n).padStart(2,'0')}-${k}.png`});count++;
 }
 if(max){await p.keyboard.press('ArrowLeft');await p.waitForTimeout(270);const q=new URL(p.url());if(Number(q.searchParams.get('clicks')||0)!==max-1)issues.push({slide:n,error:'backward navigation'});await p.keyboard.press('ArrowRight');await p.waitForTimeout(270)}
 stats.push({slide:n,clicks:max});
}
fs.writeFileSync('tmp/qa-report.json',JSON.stringify({count,stats,issues},null,2));console.log(JSON.stringify({count,issues},null,2));await b.close();if(issues.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1)});
