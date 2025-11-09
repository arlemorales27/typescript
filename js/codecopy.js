// js/codecopy.js - añade funcionalidad para botones de copiar en bloques de código
(function(){
  document.addEventListener('click', function(e){
    const btn = e.target.closest && e.target.closest('.code-copy-btn');
    if(!btn) return;
    const wrapper = btn.closest('.code-wrapper');
    if(!wrapper) return;
    const pre = wrapper.querySelector('pre');
    if(!pre) return;
    const text = pre.innerText;
    // copy with fallback
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(()=>{
        btn.classList.add('copied');
        const old = btn.textContent;
        btn.setAttribute('aria-live','polite');
        btn.textContent = 'Copiado';
        setTimeout(()=>{ btn.classList.remove('copied'); btn.textContent = old }, 1500);
      }).catch(()=>{
        btn.textContent = 'Error';
        setTimeout(()=>{ btn.textContent = 'Copiar' }, 1200);
      });
    }else{
      // fallback for older browsers
      try{
        const ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
        btn.classList.add('copied');
        const old = btn.textContent;
        btn.textContent = 'Copiado';
        setTimeout(()=>{ btn.classList.remove('copied'); btn.textContent = old }, 1500);
      }catch(err){
        btn.textContent = 'Error';
        setTimeout(()=>{ btn.textContent = 'Copiar' }, 1200);
      }
    }
  });

  // keyboard accessibility: activate on Enter/Space
  document.addEventListener('keydown', function(e){
    const el = document.activeElement;
    if(!el || !el.classList) return;
    if(!el.classList.contains('code-copy-btn')) return;
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault(); el.click();
    }
  });

  // enhance buttons on DOMContentLoaded: set role and tabindex if missing
  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.code-copy-btn').forEach(btn => {
      if(!btn.getAttribute('role')) btn.setAttribute('role','button');
      if(!btn.hasAttribute('tabindex')) btn.setAttribute('tabindex','0');
      btn.setAttribute('aria-label', 'Copiar código');
    });
  });
})();
