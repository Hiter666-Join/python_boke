document.getElementById('theme-toggle').addEventListener('click',()=>{
  const html=document.documentElement,
        now=html.getAttribute('data-theme'),
        next=now==='dark'?'light':'dark';
  html.setAttribute('data-theme',next);
  localStorage.setItem('theme',next);
});