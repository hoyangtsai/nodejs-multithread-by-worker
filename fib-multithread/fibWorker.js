const { workerData, parentPort } = require('worker_threads');
const fibonacci = require('../fibonacci.js');

const result = fibonacci(workerData.iterations);
parentPort.postMessage(result);
