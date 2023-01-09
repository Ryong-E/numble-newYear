class HomePage {
  constructor(root) {
    this.root = root;
    this.name = '한동룡';
  }

  render() {
    console.log('정상작동');
    this.root.innerHTML = `<div>웃을 때 마다${this.name}</div>`;
  }
}

export default HomePage;
