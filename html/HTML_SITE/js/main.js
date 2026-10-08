
const datasets={idade:[['17–21',-4.83],['22–24',17.47],['25–29',7.99],['30–34',10.24],['35–39',25.67],['40–44',24.82],['45–49',11.96],['50–54',19.70],['55+',24.77]],regiao:[['Centro-Oeste',-2.33],['Nordeste',19.56],['Norte',22.47],['Sudeste',10.18],['Sul',18.43]]};
function render(v){const rows=document.getElementById('rows');rows.innerHTML='';const max=Math.max(...datasets[v].map(x=>Math.abs(x[1])));datasets[v].forEach(([name,g])=>{const el=document.createElement('div');el.className='drow';el.innerHTML=`<b>${name}</b><div class="bartrack"><div class="barfill" style="width:${Math.max(5,Math.abs(g)/max*100)}%"></div></div><div class="gap ${g<0?'neg':'pos'}">${g>0?'+':''}${g.toFixed(2).replace('.',',')}%</div>`;rows.appendChild(el)});document.getElementById('dataKicker').textContent=v==='idade'?'FAIXA ETÁRIA':'REGIÃO';document.getElementById('dataTitle').textContent=v==='idade'?'Quando a diferença começa a crescer?':'A desigualdade também tem geografia.';document.getElementById('dataDesc').textContent=v==='idade'?'Compare o gap de referência em diferentes momentos da carreira.':'O mesmo indicador muda bastante quando observamos diferentes regiões.'}
render('idade');document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(b.dataset.view)});document.getElementById('gap').oninput=e=>document.getElementById('gapValue').textContent=e.target.value;document.querySelectorAll('.placeholder[href="#"]').forEach(a=>a.onclick=e=>{e.preventDefault();alert('Espaço reservado para o link externo da ferramenta. Assim que a URL estiver pronta, basta substituir este botão.')});const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
const pages=[...document.querySelectorAll('.hero,.section,.drop')];let last=-1;const pageIO=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){const idx=pages.indexOf(entry.target);if(idx!==last&&idx>0){entry.target.classList.remove('page-enter');void entry.target.offsetWidth;entry.target.classList.add('page-enter');setTimeout(()=>entry.target.classList.remove('page-enter'),1050);last=idx}}})},{threshold:.46});pages.forEach(p=>pageIO.observe(p));
function progress(){const h=document.documentElement;const max=h.scrollHeight-h.clientHeight;const pct=max?Math.min(100,Math.max(0,h.scrollTop/max*100)):0;document.body.style.setProperty('--scroll-progress',pct+'%')}addEventListener('scroll',progress,{passive:true});progress();


/* ===== bloco original ===== */


(function(){
 const progress=document.getElementById('scrollProgressV4');
 const dots=[...document.querySelectorAll('.stack-dot')];
 const ids=dots.map(d=>d.dataset.id);
 const update=()=>{
   const max=document.documentElement.scrollHeight-innerHeight;
   progress.style.width=(max?scrollY/max*100:0)+'%';
   let current='inicio';
   for(const id of ids){const el=document.getElementById(id); if(el && el.getBoundingClientRect().top < innerHeight*.48) current=id;}
   dots.forEach(d=>d.classList.toggle('active',d.dataset.id===current));
 };
 addEventListener('scroll',update,{passive:true}); update();
 dots.forEach(d=>d.addEventListener('click',e=>{e.preventDefault();document.getElementById(d.dataset.id)?.scrollIntoView({behavior:'smooth'});}));
})();


/* ===== bloco original ===== */


(function(){
 const chapters=[['inicio','01 · Abertura'],['formacao','02 · Formação'],['carreira','03 · Carreira'],['evidencias','04 · Evidências'],['dashboard','05 · Dashboard'],['solucao','06 · Solução'],['equipe','07 · Equipe']];
 const prev=document.getElementById('prevChapter'), next=document.getElementById('nextChapter'), label=document.getElementById('chapterLabel');
 let current=0;
 function nearest(){let best=0,dist=Infinity;chapters.forEach((c,i)=>{const e=document.getElementById(c[0]);if(!e)return;const d=Math.abs(e.getBoundingClientRect().top-90);if(d<dist){dist=d;best=i}});current=best;label.textContent=chapters[current][1];prev.style.opacity=current===0?'.35':'1';next.textContent=current===chapters.length-1?'Voltar ao início ↥':'Próximo →';}
 function go(i){if(i<0)i=0;if(i>=chapters.length)i=0;current=i;document.getElementById(chapters[i][0])?.scrollIntoView({behavior:'smooth',block:'start'});setTimeout(nearest,500)}
 prev.onclick=()=>go(current-1);next.onclick=()=>go(current+1);
 addEventListener('scroll',()=>requestAnimationFrame(nearest),{passive:true});nearest();
 addEventListener('keydown',e=>{if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName))return;if(e.key==='ArrowRight'||e.key==='PageDown'){e.preventDefault();go(current+1)}if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();go(current-1)}});
})();

// V6 interactive journey
const journeySteps=[
 {value:'17,0%',label:'Ingressantes',count:'01 / 04 · FORMAÇÃO',title:'A jornada começa antes do mercado.',mini:'Mulheres entre ingressantes em Tech no cenário analisado.',text:'A participação feminina já é minoritária no ingresso. O primeiro desafio é ampliar o acesso sem perder de vista a permanência.',scale:1},
 {value:'13,9%',label:'Concluintes',count:'02 / 04 · CONCLUSÃO',title:'Nem todas chegam ao fim da formação.',mini:'A participação diminui antes da entrada profissional.',text:'Entre ingresso e conclusão, a presença feminina se reduz. O dado direciona a investigação para permanência e evasão.',scale:.90},
 {value:'20,7%',label:'No mercado Tech',count:'03 / 04 · MERCADO',title:'Entrar no mercado não encerra o problema.',mini:'Participação feminina no mercado Tech do cenário analisado.',text:'A presença cresce em relação à conclusão, mas continua minoritária. O próximo ponto crítico aparece na progressão de carreira.',scale:.82},
 {value:'6,6%',label:'Na liderança',count:'04 / 04 · LIDERANÇA',title:'Nos espaços de decisão, a presença volta a encolher.',mini:'Participação feminina na liderança no cenário analisado.',text:'A queda na liderança transforma a jornada em uma pergunta de negócio: o que acontece entre a entrada e os níveis de decisão?',scale:.70}
];
const orbitDots=document.getElementById('orbitDots');
if(orbitDots){for(let i=0;i<72;i++){const dot=document.createElement('span');dot.className='orbit-dot';dot.style.setProperty('--a',`${i*5}deg`);orbitDots.appendChild(dot);}}
let journeyIndex=0;
function setJourney(i){journeyIndex=(i+journeySteps.length)%journeySteps.length;const d=journeySteps[journeyIndex];document.getElementById('orbitValue').textContent=d.value;document.getElementById('orbitLabel').textContent=d.label;document.getElementById('orbitMini').textContent=d.mini;document.getElementById('orbitTitle').textContent=d.title;document.getElementById('orbitText').textContent=d.text;document.getElementById('orbitCore').style.transform='scale(1)';document.getElementById('orbitRing').style.transform=`scale(${.88+d.scale*.12}) rotate(${journeyIndex*18}deg)`;document.querySelectorAll('.orbit-node').forEach((n,k)=>n.classList.toggle('active',k===journeyIndex));}
document.querySelectorAll('.orbit-node').forEach(n=>n.addEventListener('click',()=>setJourney(+n.dataset.step)));
// V6 salary-gap explorer
const careerData=[
 {name:'Júnior',men:5175,women:4690,gap:9.4},
 {name:'Pleno',men:9801,women:8339,gap:14.9},
 {name:'Sênior',men:17749,women:14675,gap:17.3},
 {name:'Lead / Staff',men:24843,women:19803,gap:20.3},
 {name:'Diretoria / C-Level',men:41798,women:28774,gap:31.2}
];
const brl=n=>'R$ '+n.toLocaleString('pt-BR');
function setCareer(i){const d=careerData[i], max=42000;const menY=88-(d.men/max*68),womenY=88-(d.women/max*68);document.getElementById('menLine').style.top=menY+'%';document.getElementById('womenLine').style.top=womenY+'%';document.getElementById('menSalary').style.top=menY+'%';document.getElementById('womenSalary').style.top=womenY+'%';document.getElementById('menSalary').textContent='Homens · '+brl(d.men);document.getElementById('womenSalary').textContent='Mulheres · '+brl(d.women);document.getElementById('careerGap').textContent=d.gap.toFixed(1).replace('.',',')+'%';document.querySelectorAll('.career-pill').forEach((b,k)=>b.classList.toggle('active',k===i));}
document.querySelectorAll('.career-pill').forEach(b=>b.addEventListener('click',()=>setCareer(+b.dataset.career)));setCareer(0);


/* ===== bloco original ===== */


document.addEventListener("DOMContentLoaded",function(){
  var mask=document.getElementById("v9TransitionMask");
  var navItems=document.querySelectorAll(".stack-dots a,.stack-dots button");
  navItems.forEach(function(item){
    item.addEventListener("click",function(){
      if(!mask || window.matchMedia("(prefers-reduced-motion: reduce)").matches){return;}
      mask.classList.remove("go");
      void mask.offsetWidth;
      mask.classList.add("go");
      window.setTimeout(function(){mask.classList.remove("go");},720);
    });
  });
  var tool=document.getElementById("solutionToolBtn");
  if(tool){
    tool.addEventListener("click",function(e){
      e.preventDefault();
      alert("Aqui entra a URL final da calculadora e do simulador.");
    });
  }
});


/* ===== bloco original ===== */


document.addEventListener("DOMContentLoaded",function(){
  var card=document.getElementById("v10GapCard");
  if(!card){return;}

  var data=[
    {level:"Júnior",female:4690,male:5175,gap:9.4},
    {level:"Pleno",female:8339,male:9801,gap:14.9},
    {level:"Sênior",female:14675,male:17749,gap:17.3},
    {level:"Lead / Staff",female:19803,male:24843,gap:20.3},
    {level:"Diretoria / C-Level",female:28774,male:41798,gap:31.2}
  ];

  var all=data.reduce(function(a,d){return a.concat([d.female,d.male]);},[]);
  var min=Math.min.apply(null,all);
  var max=Math.max.apply(null,all);
  var pad=(max-min)*0.10;
  var domainMin=Math.max(0,min-pad);
  var domainMax=max+pad;

  function pct(v){
    return 6 + ((v-domainMin)/(domainMax-domainMin))*88;
  }
  function money(v){
    return "R$ "+v.toLocaleString("pt-BR");
  }
  function percent(v){
    return v.toLocaleString("pt-BR",{minimumFractionDigits:1,maximumFractionDigits:1})+"%";
  }
  function render(i){
    var d=data[i];
    var fp=pct(d.female);
    var mp=pct(d.male);
    card.style.setProperty("--female",fp+"%");
    card.style.setProperty("--male",mp+"%");
    document.getElementById("v10FemaleValue").textContent=money(d.female);
    document.getElementById("v10MaleValue").textContent=money(d.male);
    document.getElementById("v10GapValue").textContent=percent(d.gap);
    document.getElementById("v10GapTag").textContent=percent(d.gap);
    document.getElementById("v10Insight").textContent=
      "Em "+d.level+", a média feminina está "+percent(d.gap)+" abaixo da masculina.";
    card.querySelectorAll("[data-v10-level]").forEach(function(b,j){
      b.classList.toggle("active",j===i);
    });
  }

  card.querySelectorAll("[data-v10-level]").forEach(function(btn){
    btn.addEventListener("click",function(){render(Number(btn.dataset.v10Level));});
  });
  render(2);
});


/* ===== bloco original ===== */


document.addEventListener("DOMContentLoaded",function(){
  var b=document.getElementById("v11SolutionBtn");
  if(b){b.addEventListener("click",function(e){e.preventDefault();alert("Aqui entra a URL final da calculadora e do simulador.");});}
});
