import React, { useState } from "react";

const Question = () => {
  const postData = require("../posts.json");

  const [results, setResults] = useState({
    answered: false,
    correct: [],
    numberCorrect: 0,
    numberOfAnswers: 0,
    posts: postData.posts,
  });

  const randomPost = () => {
    var posts = results.posts;
    const item = posts[Math.floor(Math.random() * posts.length)];
    results.posts = posts.filter((post) => post.id !== item.id);

    return (
      <div className='mb-5 pb-2'>
        <h5 className='m-5 text-muted'>
          Was this quote posted by The Real Donald Trump or by a parody account?
        </h5>

        <ul key={item.id} className='list-unstyled'>
          <li className='mt-3 p-2 text-info h3'>"{item.text}"</li>
        </ul>
        <button
          onClick={() => checkAnswer(item.true === "1", item)}
          className='btn btn-info m-3'
        >
          REAL
        </button>
        <button
          onClick={() => checkAnswer(item.true === "0", item)}
          className='btn btn-info m-3'
        >
          PARODY
        </button>
      </div>
    );
  };

  const checkAnswer = (answer, item) => {
    var real = item.item === "1" ? "REAL" : "PARODY";
    var rightAnswers = results.numberCorrect;
    var numberOfAnswers = results.numberOfAnswers + 1;
    if (answer === true) {
      answer = "CORRECT";
      rightAnswers++;
    } else {
      answer = "INCORRECT";
    }

    results.correct.push({
      answer: answer,
      text: item.text,
      true: real,
      url: item.url,
    });

    return setResults({
      answered: true,
      correct: results.correct,
      numberCorrect: rightAnswers,
      numberOfAnswers,
      posts: results.posts,
    });
  };

  const responses = () => (
    <>
      <h2>Responses</h2>
      <ul className='list-unstyled'>
        {results.correct.map((key, index) => (
          <li key={index}>
            {key.answer === "CORRECT" ? (
              <a href={key.url}>
                <span className='text-info'>
                  {index + 1} ) {key.text} - {key.true}
                </span>
              </a>
            ) : (
              <a href={key.url}>
                <span className='text-danger'>
                  {index + 1} ) {key.text} - {key.true}
                </span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </>
  );

  const triviaResults = (
    <div className='mt-5 text-muted'>
      <h3>RESULTS</h3>
      <h2>{results.numberCorrect}/10</h2>
      <button
        className='btn btn-secondary m-3'
        onClick={() => window.location.reload(false)}
      >
        RESET
      </button>
    </div>
  );

  return (
    <div className='d-flex flex-wrap justify-content-center'>
      <div className='col-sm-10 col-md-6 offset-md-2 d-block text-center'>
        {results.numberOfAnswers < 10 ? randomPost() : triviaResults}
      </div>
      <div className='col-md-2 d-block text-center mb-5 mt-5 text-muted'>
        {results.answered && responses()}
      </div>
    </div>
  );
};

export default Question;
