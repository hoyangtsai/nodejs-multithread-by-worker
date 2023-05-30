const { Worker } = require('worker_threads');

const doFib = (iterations) => {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    // --- start worker
    const worker = new Worker('./fibWorker.js', {
      workerData: {
        iterations
      }
    })
    // --- listen for message from worker
    worker.once('message', (data) => {
      console.log(`worker [${worker.threadId}]: done in ${Date.now() - start}ms`)
      resolve(data);
    })
    // --- listen for error from worker
    worker.once('error', (err) => reject(err))
  })
}

const main = async () => {
  try {
    const start = Date.now();

    const values = await Promise.all([
      doFib(40),
      doFib(40),
      doFib(40),
      doFib(40),
      doFib(40),
      doFib(40),
      doFib(40),
      doFib(40),
      doFib(40),
      doFib(40),
    ])
  
    console.table(values);

    console.log(`ALL DONE in ${Date.now() - start}ms`);
  } catch (error) {
    console.log(error)
  }
}

main();
