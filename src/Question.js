import React, { useState } from "react";

const Question = () => {
  const [results, setResults] = useState({
    answered: false,
    correct: null,
  });
  const postData = require("./posts.json");
  const posts = [];

  Object.keys(postData).map((key) => {
    let realPostArray = postData[key];
    return realPostArray.map((post) => {
      return posts.push(
        <div>
          <ul key={post.id} className='list-unstyled'>
            <li>
              <a href={post.url}>{post.text}</a>
            </li>
            <li>{post.date}</li>
          </ul>
          <button onClick={() => checkAnswer(post.true === "1")}>REAL</button>
          <button onClick={() => checkAnswer(post.true === "0")}>PARODY</button>
        </div>
      );
    });
  });

  const checkAnswer = (answer) => {
    answer ? (answer = "CORRECT") : (answer = "WRONG");
    setResults({
      answered: true,
      correct: answer,
    });
  };

  const randomPost = posts[Math.floor(Math.random() * posts.length)];

  return (
    <div className='d-flex justify-content-center'>
      <div className='col-sm-6 text-center'>
        {results.answered ? <h2>{results.correct}</h2> : randomPost}
      </div>
    </div>
  );
};

export default Question;
