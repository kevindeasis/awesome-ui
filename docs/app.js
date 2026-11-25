
(function(){
  var q=document.getElementById('q'), main=document.querySelector('main'), empty=document.getElementById('empty');
  var items=[].slice.call(main.querySelectorAll('li'));
  function apply(){
    var t=q.value.trim().toLowerCase(); var shown=0;
    items.forEach(function(li){var hit=!t||li.textContent.toLowerCase().indexOf(t)>-1; li.classList.toggle('hidden',!hit); if(hit&&t&&!li.querySelector('li'))shown++;});
    [].slice.call(main.querySelectorAll('ul,ol')).forEach(function(l){ l.classList.toggle('hidden', !!t && !l.querySelector(':scope > li:not(.hidden)')); });
    [].slice.call(main.querySelectorAll('h1,h2,h3,h4')).forEach(function(h){
      if(!t){h.classList.remove('hidden');return;}
      var n=h.nextElementSibling, any=false;
      while(n&&!/^H[1-4]$/.test(n.tagName)){ if(n.querySelector&&n.querySelector('li:not(.hidden)'))any=true; n=n.nextElementSibling;}
      h.classList.toggle('hidden',!any);
    });
    [].slice.call(main.children).forEach(function(el){ if(/^(P|BLOCKQUOTE)$/.test(el.tagName)) el.classList.toggle('hidden',!!t); });
    empty.classList.toggle('hidden',!t||shown>0);
    try{ if(t) history.replaceState(null,'','?q='+encodeURIComponent(t)); else history.replaceState(null,'',location.pathname+location.hash);}catch(e){}
  }
  q.addEventListener('input',apply);
  var m=location.search.match(/[?&]q=([^&]+)/); if(m){q.value=decodeURIComponent(m[1]);apply();}
  document.addEventListener('keydown',function(e){if(e.key==='/'&&document.activeElement!==q){e.preventDefault();q.focus();}});
  var sel=document.getElementById('lang'); sel.addEventListener('change',function(){location.href=sel.value+location.hash;});
})();
