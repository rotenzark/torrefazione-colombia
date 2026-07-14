/* ============ TORREFAZIONE COLOMBIA — interazioni ============ */
(function(){
  'use strict';

  var intro=document.getElementById('intro');
  if(intro){
    window.addEventListener('load',function(){setTimeout(function(){intro.classList.add('gone');},1150);});
    setTimeout(function(){intro.classList.add('gone');},2600);
  }

  /* orari (getDay 0=Dom..6=Sab): Lun–Sab 7–20, Dom 9–18 */
  var HOURS={0:[[9,18]],1:[[7,20]],2:[[7,20]],3:[[7,20]],4:[[7,20]],5:[[7,20]],6:[[7,20]]};
  var DAYS_IT=['domenica','lunedì','martedì','mercoledì','giovedì','venerdì','sabato'];
  var DAYS_EN=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  function romeNow(){try{return new Date(new Date().toLocaleString('en-US',{timeZone:'Europe/Rome'}));}catch(e){return new Date();}}
  function fmt(h){var hh=Math.floor(h),mm=Math.round((h-hh)*60);return hh+(mm?(':'+(mm<10?'0':'')+mm):'');}
  function computeStatus(){
    var now=romeNow(),d=now.getDay(),cur=now.getHours()+now.getMinutes()/60,today=HOURS[d]||[],i,w;
    for(i=0;i<today.length;i++){w=today[i];if(cur>=w[0]&&cur<w[1])return {open:true,until:w[1]};}
    for(i=0;i<today.length;i++){if(cur<today[i][0])return {open:false,next:today[i][0],nextDay:d,sameDay:true};}
    for(var k=1;k<=7;k++){var nd=(d+k)%7,arr=HOURS[nd]||[];if(arr.length)return {open:false,next:arr[0][0],nextDay:nd,sameDay:false};}
    return {open:false};
  }
  function renderStatus(lang){
    var s=computeStatus(),badge=document.getElementById('openBadge');if(!badge)return;
    var t=badge.querySelector('.t'),en=(lang==='en');badge.classList.toggle('op',s.open);
    if(s.open){t.innerHTML='<b>'+(en?'Open now':'Aperto ora')+'</b>'+(en?'until ':'fino alle ')+fmt(s.until);}
    else if(s.next!=null){var day=s.sameDay?(en?'today':'oggi'):(en?DAYS_EN[s.nextDay]:DAYS_IT[s.nextDay]);t.innerHTML='<b>'+(en?'Closed':'Chiuso')+'</b>'+(en?'opens ':'apre ')+day+' '+fmt(s.next);}
    else{t.innerHTML='<b>'+(en?'Closed':'Chiuso')+'</b>'+(en?'see hours':'vedi orari');}
  }
  function renderHours(lang){
    var box=document.getElementById('hoursList');if(!box)return;var en=(lang==='en'),today=romeNow().getDay(),order=[1,2,3,4,5,6,0];
    box.innerHTML=order.map(function(d){
      var arr=HOURS[d]||[],label=en?DAYS_EN[d]:DAYS_IT[d];
      var val=arr.length?arr.map(function(w){return fmt(w[0])+'–'+fmt(w[1]);}).join(' · '):(en?'Closed':'Chiuso');
      return '<div class="hourrow'+(d===today?' today':'')+'"><span class="d">'+label+'</span><span>'+val+'</span></div>';
    }).join('');
  }

  /* i18n */
  var I18N={en:{
    "nav.story":"The roastery","nav.blends":"Our blends","nav.day":"Morning to night","nav.gallery":"Gallery","nav.visit":"Find us",
    "bar.book":"Call us",
    "hero.kick":"Coffee roastery & neighbourhood bar · Ticinese",
    "hero.h1":"The coffee of<br>the Ticinese, <em>roasted round the corner</em>",
    "hero.sub":"A neighbourhood roastery and bar on Corso San Gottardo: coffee roasted in the workshop a few steps away and served warm at the counter — with a brioche, all the way to aperitivo.",
    "hero.book":"Call the bar","hero.blends":"Our blends",
    "hero.f1n":"4,3★","hero.f1l":"99 reviews",
    "hero.f2n":"7→20","hero.f2l":"open all day",
    "hero.f3n":"Al banco","hero.f3l":"the real espresso",
    "hero.stamp":"Il miglior caffè","hero.stamps":"secondo i clienti",
    "ribbon":"ESPRESSO · CAPPUCCINO · BRIOCHE · TRECCIA · FOCACCE · APERITIVO · MISCELE · TOSTATO QUI ·",
    "story.kick":"Torrefazione & bar · Corso San Gottardo",
    "story.h2":"Roasted here, <em>served at the counter</em>",
    "story.p1":"Torrefazione Colombia is a proper neighbourhood coffee shop: the beans are roasted in a small workshop a few steps away, then brought to the counter and pulled fresh, cup after cup. Regulars simply call it the best coffee in Milan.",
    "story.pull":"“This is the best coffee you will find in Milan.”",
    "story.p2":"A woman-run bar with a warm welcome, where the same counter carries you from the morning espresso and brioche to a lunchtime focaccia and an evening spritz. Loose coffee is for sale too, to take a bit of the Ticinese home.",
    "c1":"<b>Torrefazione</b> di quartiere","c2":"<b>Al banco</b> dal mattino","c3":"<b>Di proprietà</b> di donne","c4":"<b>Caffè sfuso</b> da comprare",
    "blends.kick":"La firma della casa",
    "blends.h2":"Le nostre <em>miscele</em>",
    "blends.sub":"Il caffè è tostato nel laboratorio a due passi. Alcune delle miscele che trovi al banco e da portare a casa.",
    "b1.t":"La miscela della casa","b1.note":"espresso","b1.p":"La miscela di tutti i giorni: piena, dolce, con una bella crema. Quella del «solito» al banco.",
    "b2.t":"Arabica dolce","b2.note":"100% arabica","b2.p":"Una tazza morbida e rotonda, poco amara. Per chi ama un caffè gentile.",
    "b3.t":"Africano leggero","b3.note":"leggera","b3.p":"Una tostatura più chiara e leggera, dai profumi vivaci. Bella anche lunga.",
    "b4.t":"Decaffeinato","b4.note":"senza caffeina","b4.p":"Tutto il gusto, senza la caffeina. Perfetto per il caffè della sera.",
    "blends.foot":"Tutte le miscele si comprano anche <b>sfuse</b>, macinate come preferisci.",
    "day.kick":"La giornata",
    "day.h2":"Dalla mattina <em>all'aperitivo</em>",
    "day.sub":"Lo stesso banco, tutto il giorno.",
    "m1.h":"La mattina","m1.t":"caffè & brioche","m1.p":"Si comincia con l'espresso o il cappuccino e una brioche appena sfornata.",
    "m1.l1":"Espresso e cappuccino","m1.l2":"Treccia","m1.l3":"Croissant al pistacchio","m1.l4":"Cornetti e paste",
    "m2.h":"A pranzo","m2.t":"le focacce","m2.p":"A metà giornata, le focacce farcite e uno spuntino veloce al volo.",
    "m2.l1":"Focaccia cotto e mozzarella","m2.l2":"Focaccia crudo","m2.l3":"Panini e sfoglie","m2.l4":"Un caffè per chiudere",
    "m3.h":"L'aperitivo","m3.t":"spritz & stuzzichini","m3.p":"A fine giornata, l'aperitivo servito con abbondanza di stuzzichini.",
    "m3.l1":"Spritz e cocktail","m3.l2":"Calice di vino","m3.l3":"Taglieri e stuzzichini","m3.l4":"Aperitivo speciale",
    "day.note":"<b>1–10 € a persona.</b> Colazione, pranzo veloce e aperitivo — al banco o ai tavolini.",
    "gal.kick":"Al banco",
    "gal.h2":"Un caffè <em>e due chiacchiere</em>",
    "rev.kick":"La voce dei clienti","rev.h2":"Recensioni","rev.sub":"4,3 su Google · 99 recensioni",
    "rc1":"“This is the best coffee you will find in Milan! My best friend and I visited during the Winter Olympics and ended up coming here around 10 times. Every single visit was amazing.”",
    "rc1m":"Lorena Casillas · Google",
    "rc2":"“Very fast and friendly service! One of the best treccia we've had, and the pistachio croissant is not only gorgeous but delicious — my husband's favourite ever.”",
    "rc2m":"Lydiana Stankiewicz · Local Guide",
    "rc3":"«Ottimo servizio, caffè eccellente ed i titolari sono molto educati e simpatici.»","rc3m":"Recensione Google",
    "rc4":"«Anche le focacce con cotto o crudo e mozzarella hanno un ottimo gusto.»","rc4m":"Recensione Google",
    "rc5":"«Aperitivi serviti con abbondanza di stuzzichini.»","rc5m":"Recensione Google",
    "visit.kick":"Dove siamo","visit.h2":"Corso San Gottardo 21, Ticinese",
    "visit.addr":"Address","visit.hours":"Opening hours","visit.phone":"Phone","visit.book":"Call the bar","visit.dir":"Directions",
    "svc1":"Dine in","svc2":"Takeaway coffee","svc3":"Coffee to buy",
    "faq.kick":"Good to know","faq.h2":"Questions & answers",
    "q1":"Where is Torrefazione Colombia?","a1":"We are at Corso San Gottardo 21, in the Ticinese, a few steps from the Arco di Porta Ticinese and the Darsena. A neighbourhood coffee roastery and bar.",
    "q2":"What kind of place is it?","a2":"A coffee roastery and bar: the beans are roasted in a workshop nearby and served fresh at the counter, from the morning espresso and brioche through to the evening aperitivo.",
    "q3":"Can I buy coffee to take home?","a3":"Yes — the house blends are on sale loose, ground the way you like, so you can brew our coffee at home too.",
    "q4":"Do you do aperitivo?","a4":"Yes, in the evening the counter turns to aperitivo: spritz, wine and cocktails, served with a generous spread of stuzzichini.",
    "q5":"When are you open?","a5":"Monday to Saturday 7:00–20:00 and Sunday 9:00–18:00. A quick coffee or a seat at the little tables — you're welcome all day.",
    "ft.tag":"Coffee roastery and neighbourhood bar in the Ticinese. Roasted round the corner, served at the counter — from the morning espresso to aperitivo.",
    "ft.explore":"Explore","ft.contact":"Contact","ft.rights":"Demo site — not the official shop site.",
    "ft.disc":"Independent demonstration site created to show a possible online presence for Torrefazione Colombia. Photos, reviews and details come from public Google Maps sources and belong to their owners. Not affiliated with the shop."
  }};
  var current='it',ITCACHE={};
  function collectIT(){document.querySelectorAll('[data-i18n]').forEach(function(el){ITCACHE[el.getAttribute('data-i18n')]=el.innerHTML;});}
  function apply(lang){
    current=lang;var dict=(lang==='en')?I18N.en:null;
    document.querySelectorAll('[data-i18n]').forEach(function(el){var k=el.getAttribute('data-i18n');if(lang==='en'){if(dict[k]!=null)el.innerHTML=dict[k];}else{if(ITCACHE[k]!=null)el.innerHTML=ITCACHE[k];}});
    document.documentElement.lang=lang;
    document.querySelectorAll('.lang button').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-l')===lang);});
    renderHours(lang);renderStatus(lang);
  }

  function initReveal(){
    var els=document.querySelectorAll('.reveal');
    if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in');});return;}
    var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
    els.forEach(function(e){io.observe(e);});
  }

  document.addEventListener('DOMContentLoaded',function(){
    collectIT();
    document.querySelectorAll('.lang button').forEach(function(b){b.addEventListener('click',function(){apply(b.getAttribute('data-l'));});});
    var burger=document.querySelector('.burger'),links=document.querySelector('nav.links');
    if(burger){burger.addEventListener('click',function(){
      if(links.style.display==='flex'){links.style.display='';}
      else{links.style.display='flex';links.style.position='absolute';links.style.top='68px';links.style.right='18px';links.style.flexDirection='column';links.style.background='var(--latte)';links.style.padding='16px 20px';links.style.borderRadius='12px';links.style.border='1px solid var(--line)';links.style.boxShadow='var(--shadow)';}
    });}
    document.querySelectorAll('nav.links a').forEach(function(a){a.addEventListener('click',function(){if(links&&window.innerWidth<=940)links.style.display='';});});
    renderHours('it');renderStatus('it');initReveal();
    setInterval(function(){renderStatus(current);},60000);
  });
})();
