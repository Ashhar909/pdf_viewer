import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const docs = ["2212.07931", "2212.07937", "2212.08011"];
  var num = 0;
  const docList = docs.map((doc) => {
    num = num + 1;
    return (
      <li className="doc-list" key={doc}>
        <Link
          to={`/view/${doc}`}
          style={{ textDecoration: "underline", color: "rgb(67 113 196)" }}
        >
          <h2>Sample Document {num}.pdf</h2>
        </Link>
      </li>
    );
  });
  return (
    <div>
      <h2 className="heading"> Documents </h2>
      <ul>{docList}</ul>
    </div>
  );
};

export default Home;
