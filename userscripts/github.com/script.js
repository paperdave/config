document.body.dataset.turbo = 'false';
[...document.querySelectorAll('a[data-turbo-frame]')].forEach(link => {
  delete link.dataset.turboFrame;
});

