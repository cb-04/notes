import axios from 'axios';
import fs from 'fs';

/** json2db takes a script file and operates on HarperDB */
console.log('hello database!');

//Setup DB parameters
const username = 'HDB_ADMIN';
const password = 'password';
const url = 'http://localhost:9925';

//Setup database script
const dbScriptPath = './scripts/' + 'sys-info' + '.json';
const dbScript = JSON.parse(fs.readFileSync(dbScriptPath).toString());


//Setup http configuration
const httpConfig = {
    headers: {
        "Content-Type":"application/json",
        "authorization":"Basic "
           + Buffer.from(username + ':' + password).toString('base64'),
        "cache-control":"no-cache"
    }
}

//Call the database
axios.post(url, dbScript, httpConfig)
  .then( (response) => { console.log(response.data); } )