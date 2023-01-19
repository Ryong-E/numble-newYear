import postApi from '../api/postApi';
import $ from '../utils/DOMSelector';

class HomePage {
  constructor() {
    document.title = 'HPNY 2023';
  }

  async #getPosts() {
    const receivedPosts = await postApi.get('/posts');
    return this.#listConvertToHtml(receivedPosts.data.posts);
  }

  #listConvertToHtml(lists) {
    return lists
      .map((list) => {
        return `
      <li class='post'>
        <a href='/detail?id=${list.postId}' class='detail-link nav-link'>
          <div>
            <img src=${list.image} class='post-image'>
          </div>
          <div class='post-description'>
            <h1 class='post-title'>${list.title}</h1>
            <span class='post-content'>${list.content}</span>
          </div>
        </a>
      </li>
    `;
      })
      .join('');
  }

  async render() {
    const posts = await this.#getPosts();

    $('#root').innerHTML += `
    <main>
      <section id='main-page'>
        <div id='create-post-button-box'>
          <a href='/write' id='create-post-button' class='nav-link'>새 글 작성하기</a>
        </div>
        <ul id='post-list'>
        ${posts}
        </ul>
      </section>
    </main>
    `;
  }
}

export default HomePage;
