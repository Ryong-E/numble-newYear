const Nav = () => {
  let backbutton = '';
  const isHome = location.pathname === '/';

  if (!isHome) {
    backbutton = `<a href='/'><img src="https://hpny-1.s3.ap-northeast-2.amazonaws.com/icon_chevron_left.svg" id="back-icon" class='nav-link'></img></a>`;
  }

  return `
    <nav ${isHome && `style='justify-content:flex-end;'`}>
        ${backbutton}
        <a href='/' id='logo' class='nav-link'><img src='http://61.97.184.251/favicon.png'>HPNY 2023</a>
    </nav>
    `;
};

export default Nav;
