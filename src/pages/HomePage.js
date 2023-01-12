import axios from 'axios';
import List from '../components/listConvertToHtml.js';

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
        <div>
          <img src=${list.image} class='list-image'>
        </div>
        <div class='description'>
          <h1 class='list-title'>${list.title}</h1>
          <span class='list-content'>${list.content}</span>
        </div>
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
        <ul id='list-box'>
        ${posts}
        </ul>
      </div>
    </div>
    `;
  }
}

export default HomePage;
