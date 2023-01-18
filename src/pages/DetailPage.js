import axios from 'axios';
import router from '../router';
import $ from '../utils/DOMSelector';
import getSearchParam from '../utils/getSearchParam';

class DetailPage {
  #comments;

  #postInfo;

  constructor() {
    document.title = '상세페이지';
  }

  async #getPostInfo() {
    const param = getSearchParam('id');
    const { data } = await axios.get(`http://43.201.103.199/post/${param}`);
    return data.data;
  }

  async init() {
    try {
      const responsePostInfo = await this.#getPostInfo();
      this.#postInfo = responsePostInfo.post;
      this.#comments = responsePostInfo.comments;
    } catch (error) {
      alert('없는 게시글입니다');
      history.pushState(null, null, '/');
      router();
    }
  }

  #updateComment() {
    $('#comment-list').innerHTML = this.#comments
      .map((comment) => {
        return `<li id='comment'>
      <p title=${comment.content}>${comment.content}</p>
      <button data-num=${comment.commentId}>삭제</button>
      </li>`;
      })
      .join('');
  }

  #deleteComment() {
    $('#comment-list').addEventListener('click', async (event) => {
      try {
        if (event.target.localName !== 'button') return;
        await axios.delete(`http://43.201.103.199/comment/${event.target.dataset.num}`);
        this.#comments = await this.#comments.filter(
          (comment) => String(comment.commentId) !== event.target.dataset.num,
        );
        this.#updateComment();
      } catch (error) {
        alert(error);
      }
    });
  }

  #handleSubmit() {
    $('#comment-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const comment = $('#comment-input').value;
      try {
        if (!comment) throw new Error('실패');
        const writtenComment = await axios.post(
          `http://43.201.103.199/comment/${this.#postInfo.postId}`,
          {
            content: comment,
          },
        );
        this.#comments.push(writtenComment.data.data);
        $('#comment-input').value = '';
        console.log(this.#comments);
        this.#updateComment();
      } catch (error) {
        $('#comment-input').value = '';
        alert('댓글 작성 실패');
      }
    });
  }

  async render() {
    await this.init();
    console.log(this.#comments);
    $('#root').innerHTML += `
    <main>
        <section id='post-detail'>
          <article id='post-article'>
              <img src=${this.#postInfo.image}>
              <div id='info-box'>
                  <h1>${this.#postInfo.title}</h1>
                  <span>${this.#postInfo.createdAt.slice(0, 10)}</span>
                  <p>${this.#postInfo.content}</p>
                  <div id='post-detail-button-box'>
                      <button id='post-update-button'>수정🔨</button>
                      <button id='post-delete-button'>삭제🗑</button>
                  </div>
              </div>
            </article>
            <section id='comment-section'>
              <ul id='comment-list'></ul>
              <form id='comment-form'>
                <input type='text' id='comment-input'>
                <button type='submit' id='comment-button'>게시하기</button>
              </form>
            </section>
        </section>
    </main>
    `;
    this.#updateComment();
    this.#deleteComment();
    this.#handleSubmit();
  }
}

export default DetailPage;
