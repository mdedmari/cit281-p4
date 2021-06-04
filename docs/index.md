```
{
// Question and answer data array
const data = [
    {
      question: "Q1",
      answer: "A1",
    },
    {
      question: "Q2",
      answer: "A2",
    },
    {
      question: "Q3",
      answer: "A3",
    },
  ];
  
  // Export statement must be below data declaration - no hoisting with const
  module.exports = {
    data,
  };
}
```

```
{
const fs = require("fs");
const fastify = require("fastify")();
const { data } = require("./p4-data.js");

function getQuestions(){
   const newArray = [];
   for (const obj of data) {
       newArray.push(obj.question);
   }
   return newArray;
}
function getAnswers(){
    const newArray = [];
    for (const obj of data) {
        newArray.push(obj.answer);
    }
    return newArray;
 }

 function getQuestionsAnswers(){
     const newArray = [];
     for (const obj of data) {
         newArray.push(obj);
     }
     return newArray;
 }
 
function getQuestion(number = "") {
    const certainQuestion = {
        error: '',
        question:"",
        number: ""
        // Error if number > 3
    };
    if(!Number.isInteger(number)){
        certainQuestion.error = 'Question number must be an integer'
   } else if(number > 3){
       certainQuestion.error = 'Question number must be less than the number of questions (3)';
   } else if(number < 1){
        certainQuestion.error = 'Question number must be >= 1'
   }
   else{
       certainQuestion.question = data[number-1].question;
       certainQuestion.number = parseInt(number);
   } 
   return certainQuestion
}

function getAnswer(number = ""){
    const certainAnswer = {
        error: '',
        answer: '',
        number: ''
    }
  if(!Number.isInteger(number)){
        certainAnswer.error = 'Answer number must be an integer'
    } else if(number > 3){
        certainAnswer.error = 'Answer number must be less than the number of questions (3)';
    } else if(number < 1){
         certainAnswer.error = 'Answer number must be >= 1'
    }
    else{
        certainAnswer.answer = data[number-1].answer;
        certainAnswer.number = parseInt(number);
}
return certainAnswer
}

function getQuestionAnswer(number = ""){
    const certainQuestionAnswer = {
        error: '',
        question: "", 
        number: "",
        answer: "", 
    } 
    if(!Number.isInteger(number)){
        certainQuestionAnswer.error = 'Question number must be an integer'
    } else if(number > 3){
        certainQuestionAnswer.error = 'Question number must be less than the number of questions (3)';
    } else if(number < 1){
        certainQuestionAnswer.error = 'Question number must be >= 1'
    }
    else{
        certainQuestionAnswer.answer = data[number-1].answer;
        certainQuestionAnswer.number = parseInt(number);
}
   
        return certainQuestionAnswer
}

function addQuestionAnswer(info = {}) {
  const newQuestionAnswer = {
    error: '',
    question: "Q4", 
    number: "4",
    answer: "A4", 
  }
  if(!Number.isInteger(number)){
    addQuestionAnswer.error = 'Question number must be an integer'
} else if(number > 3){
    addQuestionAnswer.error = 'Question number must be less than the number of questions (3)';
} else if(number < 1){
    addQuestionAnswer.error = 'Question number must be >= 1'
}
else{
    addQuestionAnswer.answer = data[number-1].answer;
    addQuestionAnswer.number = parseInt(number);
}

    return certainQuestionAnswer
}

/*****************************
  Module function testing
******************************/
function testing(category, ...args) {
    console.log(`\n** Testing ${category} **`);
    console.log("-------------------------------");
    for (const o of args) {
      console.log(`-> ${category}${o.d}:`);
      console.log(o.f);
    }
  }
  
  // Set a constant to true to test the appropriate function
  const testGetQs = false;
  const testGetAs = false;
  const testGetQsAs = false;
  const testGetQ = false;
  const testGetA = false;
  const testGetQA = true;
  // const testAdd = false;      // Extra credit
  // const testUpdate = false;   // Extra credit
  // const testDelete = false;   // Extra credit

  // getQuestions()
if (testGetQs) {
    testing("getQuestions", { d: "()", f: getQuestions() });
  }
  
  // getAnswers()
  if (testGetAs) {
    testing("getAnswers", { d: "()", f: getAnswers() });
  }
  
  // getQuestionsAnswers()
  if (testGetQsAs) {
    testing("getQuestionsAnswers", { d: "()", f: getQuestionsAnswers() });
  }
  
  // getQuestion()
  if (testGetQ) {
    testing(
      "getQuestion",
      { d: "()", f: getQuestion() },      // Extra credit: +1
      { d: "(0)", f: getQuestion(0) },    // Extra credit: +1
      { d: "(1)", f: getQuestion(1) },
      { d: "(4)", f: getQuestion(4) }     // Extra credit: +1
    );
  }
  
  // getAnswer()
  if (testGetA) {
    testing(
      "getAnswer",
      { d: "()", f: getAnswer() },        // Extra credit: +1
      { d: "(0)", f: getAnswer(0) },      // Extra credit: +1
      { d: "(1)", f: getAnswer(1) },
      { d: "(4)", f: getAnswer(4) }       // Extra credit: +1
    );
  }
  
  // getQuestionAnswer()
  if (testGetQA) {
    testing(
      "getQuestionAnswer",
      { d: "()", f: getQuestionAnswer() },    // Extra credit: +1
      { d: "(0)", f: getQuestionAnswer(0) },  // Extra credit: +1
      { d: "(1)", f: getQuestionAnswer(1) },
      { d: "(4)", f: getQuestionAnswer(4) }   // Extra credit: +1
    );
  }

  module.exports = {
    getQuestions,getAnswers,getQuestionsAnswers,getQuestion,getAnswer,getQuestionAnswer
  };
}
```

```
{
const fs = require("fs");
const fastify = require("fastify")();
const { getQuestions,getAnswers,getQuestionsAnswers,getQuestion,getAnswer,getQuestionAnswer } = require("./p4-module.js");

fastify.get("/cit/question", (request, reply) => {
  const questionsToReturn = getQuestions();
  const resultToReturn = JSON.stringify(questionsToReturn);
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(resultToReturn);
});
fastify.get("/cit/question/:number", (request, reply) => {
  const {numOfQuestion} = request.params;
  const questionsToReturn = getQuestions(numOfQuestion);
  const resultToReturn = JSON.stringify(questionsToReturn);
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(resultToReturn);
});



fastify.get("/cit/answer", (request, reply) => {
  const answerToReturn = getAnswers();
  const resultToReturn = JSON.stringify(answerToReturn);
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(resultToReturn);
});
fastify.get("/cit/answer/:number", (request, reply) => {
  console.log(request);
  const {numOfAnswer} = request.params;
  const answerToReturn = getAnswer(numOfAnswer);
  const resultToReturn = JSON.stringify(answerToReturn);
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(resultToReturn);
});


fastify.get("/cit/questionanswer", (request, reply) => {
  const questionAnswerToReturn = getQuestionsAnswers();
  const resultToReturn = JSON.stringify(questionAnswerToReturn);
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(resultToReturn);
});
fastify.get("/cit/questionanswer/:number", (request, reply) => {
  console.log(request);
  const {numOfquestionAnswer} = request.params;
  const questionAnswerToReturn = getQuestionsAnswers(numOfquestionAnswer);
  const resultToReturn = JSON.stringify(questionAnswerToReturn);
  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(resultToReturn);
});

fastify.get("*", (request, reply) => {
  reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send("<h1>error: Route not found,statusCode: 404</h1>");
});


  const listenIP = "localhost";
const listenPort = 8082;
fastify.listen(listenPort, listenIP, (err, address) => {
if (err) { console.log(err); process.exit(1);
}
console.log(`Server listening on ${address}`); });
}
```

```
{
{
  "name": "p4",
  "version": "1.0.0",
  "description": "",
  "main": "p4-data.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "fastify": "^3.15.1"
  }
}

}
```
