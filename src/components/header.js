const Header = () => {
  let backbutton = '';
  const isHome = location.pathname;

  if (isHome !== '/') {
    backbutton = `<a href='/'><img src="https://hpny-1.s3.ap-northeast-2.amazonaws.com/icon_chevron_left.svg" id="back-icon"></img></a>`;
  }

  return `
    <header ${isHome === '/' && `style='justify-content:flex-end;'`}>
    ${backbutton}
        <a href='/' id='logo'>🐇HPNY 2023</a>
    </header>
    `;
};

export default Header;
