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
    const gatewayMsg = await axios.get('/api/list');
    console.log(gatewayMsg.data);
    const arrayList = Object.values(objList);
    const clonedList = JSON.parse(JSON.stringify(arrayList));
    return(clonedList);
}

/**
 * Fetches data for a single note
 * @param id : Id of the note to fetch
 */

export async function getNote(id: number) {
  const idStr = id.toString();

  if (!(idStr in objList)) {
    return {};
  }

  const gatewayMsg = await axios.get(`/api/note/${idStr}`);
  console.log(gatewayMsg.data);

  const note = { ...objList[idStr] };
  note.text = objText[idStr]?.text || '';
  return note;
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
let idCount = 4;
export async function addNote() : Promise<number> {
    const msg = await axios.post('/api/note/add');
    console.log(msg.data);
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

export async function deleteNote(id:number){
    
    if(id.toString() in objList){

        const msg = await axios.delete('/api/note/1');
        console.log(msg.data);

        delete objList[id.toString()];
        delete objText[id.toString()];
    }
}
