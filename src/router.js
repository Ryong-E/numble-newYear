import Nav from './components/nav.js';
import DetailPage from './pages/DetailPage.js';
import EditPage from './pages/EditPage.js';
import HomePage from './pages/HomePage.js';
import NotFoundPage from './pages/NotFoundPage.js';
import WritePage from './pages/WritePage.js';

const router = async () => {
  const routes = [
    { path: '/', element: HomePage },
    { path: '/write', element: WritePage },
    { path: '/detail', element: DetailPage },
    { path: '/edit', element: EditPage },
  ];

  const pageMatchs = routes.map((route) => {
    return {
      route,
      isMatch: route.path === location.pathname,
    };
  });

  const foundPage = pageMatchs.find((pageMatch) => pageMatch.isMatch);

  if (!foundPage) {
    const page = new NotFoundPage();
    document.querySelector('#root').innerHTML = Nav();
    document.querySelector('#root').innerHTML += page.render();
    return;
  }

  const page = new foundPage.route.element();
  document.querySelector('#root').innerHTML = Nav();
  await page.render();
};

export default router;
