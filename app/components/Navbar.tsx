import React from "react";

function Navbar() {
  return (
    <>
      <div className="navbar sticky top-0 z-50 bg-base-100">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost text-xl">
            SP
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Link</a>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <a>Link 1</a>
                  </li>
                  <li>
                    <a>Link 2</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
