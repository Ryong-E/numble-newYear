class WritePage {
  constructor(root) {
    this.root = root;
  }
  render() {
    this.root.innerHTML = `<div>사랑을 할 순 없어도 그리울 순 있잖아요</div>`;
  }
}

export default WritePage;
