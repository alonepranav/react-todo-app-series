import React from "react";
import { AiFillInstagram, AiFillGithub } from "react-icons/ai";
import "../styles/footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="text">
        <p>[ Developer : Pranav ] Simple Todo app</p>
      </div>
      <div className="icons">
        <a href="https://www.instagram.com/pranavshilavane" target="_blank" rel="noopener noreferrer">
          <AiFillInstagram className="icon" />
        </a>

        <a href="https://www.github.com/pranavshilavane" target="_blank" rel="noopener noreferrer">
          <AiFillGithub className="icon" />
        </a>
      </div>
    </div>
  );
}
