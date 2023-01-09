import HomePage from './pages/HomePage.js';
import WritePage from './pages/WritePage.js';

class App {
  constructor(body) {
    this.body = body;
    this.render();
  }
  render() {
    const root = document.querySelector('#root');
    const homepage = new HomePage(root);
    const writepage = new WritePage(root);
    homepage.render();
    writepage.render();
  }
}

export default App;
