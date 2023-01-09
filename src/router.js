import HomePage from './pages/HomePage.js';
import WritePage from './pages/WritePage.js';

const router = async () => {
  const routes = [
    { path: '/src/index.html', element: HomePage },
    { path: '/write', element: WritePage },
  ];

  const pageMatchs = routes.map((route) => {
    return {
      route,
      isMatch: route.path === location.pathname,
    };
  });

  const foundPage = pageMatchs.find((pageMatch) => pageMatch.isMatch);
  if (foundPage) {
    const page = new foundPage.route.element();
    document.querySelector('#root').innerHTML = page.render();
    return;
  }
  document.querySelector('#root').innerHTML = `<div>not found page</div>`;
};

export default router;
