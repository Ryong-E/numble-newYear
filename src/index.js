import router from './router.js';

window.addEventListener('popstate', router);

window.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.className === 'nav-link') {
      e.preventDefault();
      history.pushState(null, null, e.target.href);
      router();
    }
  });
  router();
});
export default router;
