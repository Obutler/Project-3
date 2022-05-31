// Require the Fastify framework and instantiate it

const fs = require("fs");
const fastify = require("fastify")();
const { coinCount } = require("./p3-modules.js");

// Handle GET verb for / route using Fastify
// Note use of "chain" dot notation syntax

fastify.get("/", (request, reply) => {
  fs.readFile(`${__dirname}/index.html`, (err, data) => {
    if (err) {
      reply
        .code(500)
        .header("Content-Type", "text/html; charset=utf-8")
        .send("<h1>Error Occurred</h1>");
    } else {
      reply
        .code(200)
        .header("Content-Type", "text/html; charset=utf-8")
        .send(data);
    }
  });
});

fastify.get("/coin", (request, reply) => {
  const { count = 0, denom = 0 } = request.query;
  const coinValue = coinCount({ denom, count });

  // ^^^ this is bascially saying denom: denom and count: count when you enter the url query request values it calls
  //the function and outputs the correct values from the functions.
  
  reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(
      count && denom
        ? `<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`
        : "<h2> Enter count and denom please </h2>"
    );
});

fastify.get("/coins", (request, reply) => {
  let { option } = request.query;
  option = parseInt(option);

  let coinValue;
  let option1;
  let option2;
  let option3;
  let coins = [
    { denom: 25, count: 2 },
    { denom: 1, count: 7 },
  ];

  option1 = parseInt(option1);
  option2 = parseInt(option2);
  option3 = parseInt(option3);

  switch (option) {
    case 1:
      coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
      break;

    case 2:
      coinValue = coinCount(...coins);
      break;

      // Spread syntax (...) allows an iterable such as an array expression 
      // or string to be expanded in places where zero or more arguments (for function calls) 
      // or elements (for array literals) are expected, or an object expression to be expanded 
      // in places where zero or more key-value pairs (for object literals) are expected.

    default:
      coinValue = 0;
      break;
  }

  reply
    .code(200)
    .header("Content-Type", "text/html; charset=utf-8")
    .send(
      `<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`
    );
});

// Start server here:
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
