import axios from 'axios';
import router from '../router';
import $ from '../utils/DOMSelector';
import getSearchParam from '../utils/getSearchParam';

class EditPage {
  #postInfo;

  #title;

  #content;

  constructor() {
    document.title = '수정페이지';
  }

  #handleChange() {
    $('#write-title').addEventListener('keyup', (event) => {
      this.#title = event.target.value;
      this.#confirmInput();
    });
    $('#write-content').addEventListener('keyup', (event) => {
      this.#content = event.target.value;
      this.#confirmInput();
    });
  }

  async init() {
    const param = getSearchParam('id');
    const { data } = await axios.get(`http://43.201.103.199/post/${param}`);
    this.#postInfo = data.data.post;
    this.#title = this.#postInfo.title;
    this.#content = this.#postInfo.content;
  }

  #confirmInput() {
    const submitButton = $('#write-submit-button');
    if (this.#content && this.#title) {
      submitButton.style.backgroundColor = '#12d4c9';
      submitButton.style.cursor = 'pointer';
      submitButton.disabled = false;
      return;
    }
    submitButton.style.backgroundColor = '#e2e2e2';
    submitButton.style.cursor = 'not-allowed';
    submitButton.disabled = true;
  }

  async #handleSubmit() {
    $('#edit-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      await axios.patch(`http://43.201.103.199/post/${getSearchParam('id')}`, {
        title: this.#title,
        content: this.#content,
      });
      history.pushState(null, null, `/detail?id=${getSearchParam('id')}`);
      router();
    });
  }
  async render() {
    await this.init();
    $('#root').innerHTML += `
    <main>
      <section id="write-page">
        <article id='post-article'>
          <img src=${this.#postInfo.image}>
        </article>
        <section id='edit-section'>
            <form id='edit-form'>
                <div id='enter-title'>
                    <h1>제목</h1>
                    <input type='text' id='write-title' value=${this.#postInfo.title}>
                </div>
                <div id='enter-content'>
                    <h1>내용</h1>
                    <textarea id='write-content' maxlength='500'>${
                      this.#postInfo.content
                    }</textarea>
                </div>
                <button type='submit' id='write-submit-button' disable='true'>수정하기</button>
            </form>
        </section>
      </section>
    </main>;
    `;
    this.#handleSubmit();
    this.#handleChange();
    this.#confirmInput();
  }
}

export default EditPage;
