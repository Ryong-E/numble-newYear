import router from './router.js';

class App {
  constructor(body) {
    this.body = body;
    this.render();
  }
  render() {
    document.addEventListener('DOMContentLoaded', () => {
      router();
    });
  }
}

export default App;
