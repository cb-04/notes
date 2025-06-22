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
    const response = await axios.get('/api/list');
    return(response.data);
}

/**
 * Fetches data for a single note
 * @param id : Id of the note to fetch
 */

export async function getNote(id: number) {

  const response = await axios.get('/api/note/'+id);
  return (response.data);
}


/**
 * Save a note
 * @param id : Id of the note to save
 * @param newTitle New title for the note
 * @param newText Editted text for the note
 */

export async function saveNote(id: number, newTitle: string, newText: string) {
  const msg = await axios.put('/api/note/save/1');
  console.log(msg.data);

  const idStr = id.toString();

  // Ensure note exists (for new note case)
  if (!objList[idStr]) {
    objList[idStr] = {
      id: idStr,
      datetime: Utils.getDateTime(),
      title: '',
    };
  }

  if (!objText[idStr]) {
    objText[idStr] = {
      id: idStr,
      text: '',
    };
  }

  objList[idStr].title = newTitle;
  objText[idStr].text = newText;
}


/**
 * Adds a blank note to the list
 * 
 * @returns id of the new note created
 */
export async function addNote() : Promise<number> {
    const response = await axios.post('/api/note/add');
    return (parseInt(response.data));
}

/**
 * Deletes a note from the list
 * 
 * @param id : Id of the note to be deleted
 */

export async function deleteNote(id:number) : Promise<number> {
  const response = await axios.delete('/api/note/'+id);
  return( parseInt(response.data) );
}
