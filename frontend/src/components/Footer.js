import React from "react";

function Footer() {
  return (
    <footer className="footer page__footer">
      <p className="footer__copyright">&#169; {(new Date().getFullYear())} TestMesto MF</p>
    </footer>
  )
};

export default Footer;