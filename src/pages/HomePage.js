import axios from 'axios';

class HomePage {
  async getPosts() {
    console.log('fetching');
    const { data } = await axios.get('http://43.201.103.199/posts');
    console.log('asdas');
    return this.#listConvertToHtml(data.data.posts);
  }

  #listConvertToHtml(lists) {
    return lists
      .map((list) => {
        return `
      <li class='list'>
      <a href='/detail?id=${list.postId}'>
        <div>
          <img src=${list.image} class='list-image'>
        </div>
        <div class='description'>
          <h1 class='list-title'>${list.title}</h1>
          <span class='list-content'>${list.content}</span>
        </div>
        </a>
      </li>
    `;
      })
      .join('');
  }

  async render() {
    const posts = await this.getPosts();
    return `
    <div id='wrap'>
      <div id='container'>
        <div id='create-post-button-box'>
          <a href='/write' id='create-post-button'>새 글 작성하기</a>
        </div>
        <ul id='list-box'>
        ${posts}
        </ul>
      </div>
    </div>
    `;
  }
}

export default HomePage;
