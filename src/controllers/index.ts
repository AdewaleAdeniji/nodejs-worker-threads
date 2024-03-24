import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { getFromDB, saveToDB } from "../db";
import { FileStatuses } from "../constants/fileStatuses";
import { ImportResponses } from "../responses/importResponses";
import path from "path";
import { Worker } from "worker_threads";
import { getFilePath } from "../utils";

export const ImportStatementHandler = (req: Request, res: Response) => {
    console.log('import statement hit')
    // processing bank statement
    const key = req.query.key as string;
    if(!key) return res.sendStatus(400);
    // generate unique id for the bank statement
    const uniqueKey = uuidv4();
    // save that uniqueid and the bank statement to the database(PROCESSING)
    updateBankStatementStatus(uniqueKey, FileStatuses.PROCESSING)
    // send back the unique statement
    res.json({ trackKey: uniqueKey, status: FileStatuses.PROCESSING, message: ImportResponses.IMPORT_PROCESSING  })
    
    // now start processing
    const filePath = getFilePath(key);

    // node javascript workers come in!
    const worker = new Worker(path.resolve(__dirname, '../utils/fileReader.js'), { workerData: filePath });


    worker.on('message', (data) => {
        // Send the parsed transactions array to cache
        // do anything with it

        console.log('file complete');
        //console.log(data);
        updateBankStatementStatus(uniqueKey, FileStatuses.COMPLETED, data)
        
        // TODO: calculate total balance
        // TODO: calculate balance by transaction type
        // TODO: calculate balance by transaction category/type
        // TODO: calculate spent amount by bank transfer recipient
        // TODO: calulcate amount spent by date/time

        

    });

    worker.on('error', (error) => {
        console.log(error)
        updateBankStatementStatus(uniqueKey, FileStatuses.FAILED)
        console.log({ error: 'An error occurred while processing the file.' });
    });

    worker.on('exit', (code) => {
        // code == 0, 1
        console.log({ error: 'File processing worker stopped with exit code ' + code });
    });
    // once done processing, update the status to completed or failed
    // depending on the status, it'll now update the db with the new status and data





}

export const GetStatementFromStatementKeyHandler = (req: Request, res: Response) => {
    const trackKey = req.query.trackKey as string;
    if(!trackKey) return res.sendStatus(400);
    const { found, value } = getFromDB(trackKey);
    if(!found) return res.json({ message: ImportResponses.IMPORT_NOT_FOUND });
    res.json(value);
}


const updateBankStatementStatus = (key: string, status: string, data: any = {}) => {
    return saveToDB(key, { status, data })
}