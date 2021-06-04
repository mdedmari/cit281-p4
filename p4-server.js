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