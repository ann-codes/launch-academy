import React, { useState, useEffect } from "react";
import FAQItems from "./FAQItems";
import FAQForm from "./FAQForm";

const FAQContainer = props => {
  // create state containers to get and set data upon fetch
  const [data, setData] = useState([]);

  // setting up fetch function to get data to display, will callback in useEffect
  const fetchData = () => {
    fetch("/api/v1/questions", {
      headers: {
        "Content-Type": "application/json",
        credentials: "same-origin"
      }
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(body => {
        setData(body);
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  };

  // calling useEffect to fetch data
  useEffect(fetchData, []);
  // console.log("----", data); /// test ~~~~~~

  const submitNewFAQ = payload => {
    fetch("/api/v1/questions", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(body => {
        setData(data.concat(body));
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    // console.log(data)
  };

  // b/c first render will be null to falsy, useEffect will fetch data and update the
  // state of data of fetched data, then map and reset the idCount only if data array exists
  // let mappedFAQ, idCount;
  // if (data) {
  //   idCount = data.length;
  //   mappedFAQ = data.map(item => (
  //     <FAQItems key={item.id} question={item.question} answer={item.answer} />
  //   ));
  // }

  let mappedFAQ = data.map(item => (
    <FAQItems key={item.id} question={item.question} answer={item.answer} />
  ));

  return (
    <div className="container">
      <h1>We're here to help</h1>
      {mappedFAQ}
      <FAQForm handleFAQSubmit={submitNewFAQ} />
    </div>
  );
};

export default FAQContainer;

// // Provided Code
// const FAQContainer = props => {
// const [questions, setQuestions] = useState([])
// const [selectedQuestion, setSelectedQuestion] = useState([])

// const toggleQuestionSelect = (id) => {
//   if(id === selectedQuestion) {
//     setSelectedQuestion(null)
//   }
//   else {
//     setSelectedQuestion(id)
//   }
// }

// const questionListItems = questions.map(question => {
//   let selected;
//   if (selectedQuestion === question.id) {
//     selected = true
//   }

//   let handleClick = () => { toggleQuestionSelect(question.id) }

//   return(
//     <Question
//       key={question.id}
//       question={question.question}
//       answer={question.answer}
//       selected={selected}
//       handleClick={handleClick}
//     />
//   )
// })

// return(
//   <div className='page'>
//     <h1>We Are Here To Help</h1>
//     <div className='question-list'>
//       {questionListItems}
//     </div>
//   </div>
// )
// };
