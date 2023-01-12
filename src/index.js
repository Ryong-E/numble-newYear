import Header from './components/header.js';
import HomePage from './pages/HomePage.js';
import WritePage from './pages/WritePage.js';

const router = async () => {
  const routes = [
    { path: '/', element: HomePage },
    { path: '/write', element: WritePage },
  ];

  const pageMatchs = routes.map((route) => {
    return {
      route,
      isMatch: route.path === location.pathname,
    };
  });

  const foundPage = pageMatchs.find((pageMatch) => pageMatch.isMatch);

  if (!foundPage) return (document.querySelector('#root').innerHTML = `<div>not found page</div>`);

  const page = new foundPage.route.element();
  document.querySelector('#root').innerHTML = Header();
  document.querySelector('#root').innerHTML += await page.render();
};

window.addEventListener('popstate', router);

window.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.localName === 'a') {
      e.preventDefault();
      history.pushState(null, null, e.target.href);
      router();
    }
  });
  router();
});

export default router;
