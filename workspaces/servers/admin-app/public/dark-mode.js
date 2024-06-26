(() => {
  const dark = localStorage.getItem('dark');
  if (dark === 'true') {
    document.body.classList.add('dark');
  }

  const toggle = document.querySelector('.toggle-theme');
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('dark', document.body.classList.contains('dark'));
  });
})();
