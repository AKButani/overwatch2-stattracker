import React from "react";
import "./Layout.css";

const Layout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <nav className="container-fluid">
        <ul>
          <li>
            <h1>Stat-Watch</h1>
          </li>
        </ul>
      </nav>
      <main className="container-fluid">{props.children}</main>
    </>
  );
};

export default Layout;
