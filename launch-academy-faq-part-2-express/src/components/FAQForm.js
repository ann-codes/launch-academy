import React, { Fragment, useState } from "react";
import ErrorList from "./ErrorList";

import validateSubmission from "../functions/validateSubmission";

const FAQForm = props => {
  // set defaults so that it can be used more than once
  // IDs do not need to be set since there is a function on the server side that creates it
  const defaultNewFAQ = {
    question: "",
    answer: ""
  };
  // create state for new FAQs
  const [newFAQ, setNewFAQ] = useState(defaultNewFAQ);
  // create state for errors
  const [errors, setErrors] = useState({});

  // set handle change for when user input in text fields changes
  const handleChange = e => {
    let valToAdd = e.currentTarget.value;
    setNewFAQ({
      ...newFAQ,
      [e.currentTarget.name]: valToAdd
    });
    // console.log(newFAQ); //// does it work? test it out!
  };

  const handleSubmit = e => {
    e.preventDefault();
    // setting payload
    let payload = {
      question: newFAQ.question.trim(),
      answer: newFAQ.answer.trim()
    };
    // validating that the submission contains stuff, there is also validation serverside
    if (validateSubmission(["question", "answer"], newFAQ, setErrors)) {
      // can also use props.handleFAQSubmit(newFAQ);
      props.handleFAQSubmit(payload);
      // resetting to default/clear fields upon submit
      setNewFAQ(defaultNewFAQ);
    }
  };

  return (
    <Fragment>
      <h2>Add your own FAQ</h2>
      <ErrorList errors={errors} />
      <form id="submit-new-rest" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question">Question:</label>
          <input
            type="text"
            id="question"
            name="question"
            onChange={handleChange}
            value={newFAQ.question}
          />
          <label htmlFor="answer">Answer:</label>
          <input
            type="text"
            id="answer"
            name="answer"
            onChange={handleChange}
            value={newFAQ.answer}
          />
          <input className="button" type="submit" value="Submit Your FAQ" />
        </div>
      </form>
    </Fragment>
  );
};

export default FAQForm;
