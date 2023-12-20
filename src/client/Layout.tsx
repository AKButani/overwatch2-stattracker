import React from "react";
import "./Layout.css";
import "./fonts.css"
import "./App.css"
const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <nav className="container-fluid">
        <ul>
          <li>
            <h1 className="Title">
              <span className="TitleFirstLetter">S</span>
              <span className="TitleRest">t</span>
              <span className="TitleA">a</span>
              <span className="TitleRest">t-W</span>
              <span className="TitleA">a</span>
              <span className="TitleRest">tch</span>
            </h1>
          </li>
        </ul>
      </nav>
      <main className="container-fluid">{props.children}</main>
    </>
  );
};

export default Layout;
