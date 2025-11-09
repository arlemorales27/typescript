// main.js - interacciones mínimas: smooth scroll y prefijo de ruta para file:// vs server
(function(){
  // Smooth scrolling for internal links
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a');
    if(!a) return;
    var href = a.getAttribute('href') || '';
    if(href.startsWith('#')){
      e.preventDefault();
      var el = document.querySelector(href);
      if(el) el.scrollIntoView({behavior:'smooth'});
    }
  });
})();

