const disableImageUpload = () => {
  const imageBox = document.querySelector('#image-upload-box');
  imageBox.innerHTML = '<h1>이미지 추가 완료</h1>';
  imageBox.style.backgroundColor = 'grey';
  imageBox.style.cursor = 'not-allowed';
  imageBox.style.backgroundImage = 'none';
};

export default disableImageUpload;
