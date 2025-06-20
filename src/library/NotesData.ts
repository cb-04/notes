import * as Utils from './Utils';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080';

/**
 * Data library for notes
 * @packagedocumentation
 */
/** 
 * @ignore
*/

const list = JSON.parse(
   `[
   {"id":"1","datetime":"2020-03-01%10:10","title":"My First Note"},
   {"id":"2","datetime":"2020-03-02%11:11","title":"My Second Note"},
   {"id":"3","datetime":"2020-03-03%12:12","title":"My Third Note"},
   {"id":"4","datetime":"2020-03-04%13:13","title":"My Fourth Note"}
   ]`
);

const objList = Utils.array2Obj(list,'id');

const text = JSON.parse(
   `[
   {"id":"1","text":"Text for My First Note"},
   {"id":"2","text":"Text for My Second Note"},
   {"id":"3","text":"Text for My Third Note"},
   {"id":"4","text":"Text for My Fourth Note"}
   ]`
);

const objText = Utils.array2Obj(text,'id');

/**
 * Returns list of all notes
 */

export async function getList(){
    const gatewayMsg = await axios.get('/');
    //console.log(gatewayMsg.data);
    const arrayList = Object.values(objList);
    const clonedList = JSON.parse(JSON.stringify(arrayList));
    return(clonedList);
}

/**
 * Fetches data for a single note
 * @param id : Id of the note to fetch
 */

export function getNote(id:number){
    if(!(id.toString() in objList))
        return({});
    const note = objList[id.toString()];
    const clonedNote = Object.assign({},note);
    clonedNote.text = objText[id.toString()].text;
    return(clonedNote);
}

/**
 * Save a note
 * @param id : Id of the note to save
 * @param newTitle New title for the note
 * @param newText Editted text for the note
 */

export function saveNote(id:number, newTitle:string, newText:string){
    const note = objList[id.toString()];
    note.title = newTitle;

    const noteText = objText[id.toString()];
    noteText.text = newText;
}

/**
 * Adds a blank note to the list
 * 
 * @returns id of the new note created
 */
let idCount = 4;
export function addNote() : number {
    const newId = (++idCount).toString();
    objList[newId] = 
        {id:newId,
         datetime:Utils.getDateTime(),
         title:'Untitled'};
    
    objText[newId] = {id:newId, text:''};
    return (parseInt(newId));
}

/**
 * Deletes a note from the list
 * 
 * @param id : Id of the note to be deleted
 */

export function deleteNote(id:number){
    
    if(id.toString() in objList){
        delete objList[id.toString()];
        delete objText[id.toString()];
    }
}
