// js/playground.js - playground con esbuild-wasm (fallback a TS CDN)
(async function(){
  const codeArea = document.getElementById('codeArea');
  const runBtn = document.getElementById('runBtn');
  const buildBtn = document.getElementById('buildBtn');
  const resetBtn = document.getElementById('resetBtn');
  const output = document.getElementById('output');
  const sandbox = document.getElementById('sandbox');
  const targetSel = document.getElementById('targetSel');

  function logOut(msg, isError){
    const el = document.createElement('pre');
    el.textContent = msg;
    el.style.margin = '6px 0';
    el.style.color = isError ? '#ff9b9b' : '#cfe6ff';
    output.appendChild(el);
    output.scrollTop = output.scrollHeight;
  }
  function clearOut(){ output.innerHTML = '' }

  // Try to initialize esbuild-wasm
  let esbuildAvailable = false;
  if(window.esbuild){
    try{
      await esbuild.initialize({ wasmURL: 'https://unpkg.com/esbuild-wasm@0.17.19/esbuild.wasm' });
      esbuildAvailable = true;
      logOut('esbuild-wasm inicializado.');
    }catch(err){
      console.warn('esbuild init failed', err);
      logOut('No se pudo inicializar esbuild-wasm, se usará TypeScript CDN como fallback.', true);
      esbuildAvailable = false;
    }
  }else{
    logOut('esbuild no está disponible; usando TypeScript CDN como fallback.');
  }

  function compileWithTS(source){
    if(!window.ts) throw new Error('TypeScript no cargado');
    const compilerOptions = { module: ts.ModuleKind.ES2020, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.None };
    const res = ts.transpileModule(source, { compilerOptions });
    return res.outputText;
  }

  async function compileWithEsbuild(source){
    // Use esbuild to bundle TS into a single JS file (supports import resolution for simple cases)
    try{
      const result = await esbuild.build({
        stdin: { contents: source, resolveDir: '/', loader: 'ts', sourcefile: 'playground.ts' },
        bundle: true,
        write: false,
        platform: 'browser',
        target: ['es2020'],
        format: 'esm'
      });
      if(result && result.outputFiles && result.outputFiles.length) return result.outputFiles[0].text;
      throw new Error('esbuild no retornó output');
    }catch(err){
      throw err;
    }
  }

  function getIframeDocument(){
    if(!sandbox) return null;
    try{ const win = sandbox.contentWindow; const doc = sandbox.contentDocument || (win && win.document); return doc || null }catch(e){ return null }
  }

  async function transpile(source){
    if(esbuildAvailable){
      try{ return await compileWithEsbuild(source); }
      catch(err){ logOut('esbuild falló: ' + (err.message || err), true); logOut('Usando fallback TypeScript (transpileModule).'); }
    }
    // fallback
    try{ return compileWithTS(source); }catch(err){ throw err }
  }

  function injectToIframe(js){
    const iframeDoc = getIframeDocument();
    if(!iframeDoc) { logOut('No se pudo acceder al iframe sandbox', true); return }
    iframeDoc.open();
    const consoleCapture = "(function(){" +
      "const origLog=console.log, origErr=console.error;" +
      "console.log=function(){ parent.postMessage({type:'log', args: Array.from(arguments)}, '*'); origLog.apply(console, arguments); };" +
      "console.error=function(){ parent.postMessage({type:'error', args: Array.from(arguments)}, '*'); origErr.apply(console, arguments); };" +
    "})();";

    const safeJs = js.replace(/<\/(script)>/gi, '<\\/$1>');
    const html = '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>' +
      '<script>' + consoleCapture + '<' + '/script>' +
      '<script type="module">' + safeJs + '<' + '/script>' +
      '</body></html>';
    iframeDoc.write(html);
    iframeDoc.close();
  }

  async function run(){
    clearOut();
    if(!codeArea){ logOut('Editor no disponible', true); return }
    const source = codeArea.value;
    let js;
    try{ js = await transpile(source); }
    catch(err){ logOut('Error de compilación: ' + (err.message || err), true); return }
    logOut('// JS compilado:\n' + js);
    injectToIframe(js);
  }

  async function buildOnly(){
    clearOut(); if(!codeArea){ logOut('Editor no disponible', true); return }
    try{ const js = await transpile(codeArea.value); logOut('// JS compilado:\n' + js); }catch(err){ logOut('Error: ' + (err.message || err), true) }
  }

  window.addEventListener('message', function(ev){ const d = ev.data || {}; if(d.type === 'log') logOut(String(d.args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' '))); if(d.type === 'error') logOut('ERROR: ' + d.args.join(' '), true); });

  if(runBtn) runBtn.addEventListener('click', run);
  if(buildBtn) buildBtn.addEventListener('click', buildOnly);
  if(resetBtn) resetBtn.addEventListener('click', function(){ if(codeArea) codeArea.value = '// Nuevo snippet\n'; clearOut(); });

  // enhance copy buttons
  document.querySelectorAll('.code-copy-btn').forEach(b=>{ if(!b.getAttribute('role')) b.setAttribute('role','button'); if(!b.hasAttribute('tabindex')) b.setAttribute('tabindex','0'); });

})();
