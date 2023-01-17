import axios from 'axios';
import router from '../router';

class HomePage {
  constructor() {
    document.title = 'HPNY 2023';
  }
  async getPosts() {
    const { data } = await axios.get('http://43.201.103.199/posts');
    return this.#listConvertToHtml(data.data.posts);
  }

  #listConvertToHtml(lists) {
    return lists
      .map((list) => {
        return `
      <li class='list'>
        <a href='/detail?id=${list.postId}' class='detail-link'>
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

    document.querySelector('#root').innerHTML += `
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

    document.querySelectorAll('.detail-link').forEach((elem) => {
      elem.addEventListener('click', (event) => {
        event.preventDefault();
        history.pushState(null, null, event.currentTarget.href);
        router();
      });
    });
  }
}

export default HomePage;
