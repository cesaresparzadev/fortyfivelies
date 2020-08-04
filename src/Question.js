import React, { useState } from "react";

const Question = () => {
  const postData = require("./posts.json");

  const [results, setResults] = useState({
    answered: false,
    correct: null,
    numberCorrect: 0,
    numberOfAnswers: 0,
    posts: [],
  });

  var postArray = [];

  Object.keys(postData).map((key) => {
    let realPostArray = postData[key];
    return realPostArray.map((item) => {
      return postArray.push(
        <div>
          <button
            onClick={() => checkAnswer(item.true === "1")}
            className="btn btn-info m-3"
          >
            REAL
          </button>
          <button
            onClick={() => checkAnswer(item.true === "0")}
            className="btn btn-info m-3"
          >
            PARODY
          </button>
          <ul key={item.id} className="list-unstyled">
            <li className="mt-3 p-2">
              <a href={item.url} target="_blank">
                {item.text}
              </a>{" "}
              <span className="text-muted">{item.date}</span>
            </li>
          </ul>
        </div>
      );
    });
  });

  const checkAnswer = (answer) => {
    var rightAnswers = results.numberCorrect;
    var numberOfAnswers = results.numberOfAnswers + 1;
    if (answer === true) {
      answer = "CORRECT";
      rightAnswers++;
      console.log(`Correct Answers: ${rightAnswers}`);
    }

    return setResults({
      answered: true,
      correct: answer,
      numberCorrect: rightAnswers,
      numberOfAnswers,
    });
  };

  const RandomPost = () => {
    const indexSelelected = Math.floor(Math.random() * postArray.length);
    const postSelected = postArray[indexSelelected];
    postArray.splice(indexSelelected, 1);
    return postSelected;
  };

  const triviaResults = (
    <div>
      <h3>RESULTS</h3>
      <h2>{results.numberCorrect}/5</h2>
      <button
        className="btn btn-secondary m-3"
        onClick={() => window.location.reload(false)}
      >
        RESET
      </button>
    </div>
  );

  return (
    <div className="question d-flex justify-content-center">
      <div className="col-sm-6 d-block text-center">
        {results.numberOfAnswers < 5 ? <RandomPost /> : triviaResults}
      </div>
    </div>
  );
};

export default Question;
