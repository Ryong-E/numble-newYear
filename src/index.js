import router from './router.js';

window.addEventListener('popstate', router);

window.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (event) => {
    if (event.target.className === 'nav-link') {
      event.preventDefault();
      history.pushState(null, null, event.target.href);
      router();
    }
  });
  router();
});
export default router;
