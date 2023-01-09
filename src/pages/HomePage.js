class HomePage {
  constructor(root) {
    this.root = root;
    this.name = '한동룡';
    this.render();
  }

  render() {
    return `<div>웃을 때 마다${this.name}</div>`;
  }
}

export default HomePage;
