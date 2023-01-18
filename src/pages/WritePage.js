import axios from 'axios';
import router from '../router';
import disableImageUpload from '../utils/disableImageUpload';
import $ from '../utils/DOMSelector';

class WritePage {
  #title;

  #content;

  #imageUrl;

  constructor() {
    document.title = '새해 인사 남기기';
  }

  #handleChange() {
    $('#write-title').addEventListener('keyup', (event) => {
      this.#title = event.target.value;
      console.log(this.#title);
      this.#confirmInput();
    });
    $('#write-content').addEventListener('keyup', (event) => {
      this.#content = event.target.value;
      console.log(this.#content);
      this.#confirmInput();
    });
  }

  async #getRandomImage() {
    $('#image-upload-box').addEventListener('click', async (event) => {
      const randomImage = await axios.get('https://api.unsplash.com/photos/random', {
        headers: { Authorization: 'Client-ID 1eN_29BT8sX_Ixgn7-T5KZnRM5EAI8m8aOgl5q2eul8' },
      });
      this.#imageUrl = randomImage.data.urls.regular;
      disableImageUpload();
      this.#confirmInput();
    });
  }

  async #handleSubmit() {
    $('#write-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      try {
        await axios.post('http://43.201.103.199/post', {
          title: this.#title,
          content: this.#content,
          image: this.#imageUrl,
        });
        history.pushState(null, null, '/');
        router();
      } catch (error) {
        alert(error.response.data.message);
      }
    });
  }

  #confirmInput() {
    const submitButton = $('#write-submit-button');
    if (this.#content && this.#title && this.#imageUrl) {
      submitButton.style.backgroundColor = '#12d4c9';
      submitButton.style.cursor = 'pointer';
      submitButton.disabled = false;
      return;
    }
    submitButton.style.backgroundColor = '#e2e2e2';
    submitButton.style.cursor = 'not-allowed';
    submitButton.disabled = true;
  }

  render() {
    $('#root').innerHTML += `
    <div id='wrap'>
      <div id='write-container'>
        <div id='image-upload-box'>

        </div>
        <div id='form-box'>
          <form id='write-form'>
            <div id='enter-title'>
              <h1>제목</h1>
              <input id='write-title' type='text' name='title' placeholder='글 제목을 입력해주세요' maxlength='30'>
            </div>
            <div id='enter-content'>
              <h1>내용</h1>
              <textarea id='write-content' name='content' placeholder='내용을 입력해주세요' maxlength='500'></textarea>
            </div>
            <button type='submit' id='write-submit-button' disable='true'>등록하기</button>
          </form>
        </div>
      </div>
    </div>    `;
    this.#getRandomImage();
    this.#handleChange();
    this.#handleSubmit();
  }
}
export default WritePage;
