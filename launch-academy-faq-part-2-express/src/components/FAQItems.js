import React, { Fragment, useState } from "react";
import Question from "./Question";
import Answer from "./Answer";

const FAQItems = props => {
  // create states to determine if question is clicked to show answer
  const [showFAQ, setShowFAQ] = useState(false);
  // at the pre-mapped item building level include ability to show FAQ
  // upon click based on state
  const handleClick = () => {
    if (showFAQ) {
      setShowFAQ(false);
    } else {
      setShowFAQ(true);
    }
  };

  return (
    <Fragment>
      <Question
        handleClick={handleClick}
        fontAwsFace={showFAQ ? "fas fa-grin-stars" : "fas fa-meh"}
        classQuestion={showFAQ ? "faq-green" : ""}
        question={props.question}
      />
      <Answer
        answer={props.answer}
        classAnswer={showFAQ ? "faq-show" : "faq-hide"}
      />
      <hr />
    </Fragment>
  );
};

export default FAQItems;
