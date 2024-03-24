//express 
import express from 'express';
import { GetStatementFromStatementKeyHandler, ImportStatementHandler } from './controllers';

const app = express();
const port = 9000;

// 2 real endpoint
// processing bank statement
app.get('/import', ImportStatementHandler)
app.get('/get-import', GetStatementFromStatementKeyHandler)
// getting the bank statement




app.listen(port, () => {
  console.log(`Worker service listening at ${port}`);
});