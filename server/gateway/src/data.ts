import * as Utils from './Utils';

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

export function getList() : unknown{
    const arrayList = Object.values(objList);
    const clonedList = JSON.parse(JSON.stringify(arrayList));
    return(clonedList);
}

/**
 * Converts id to string and checks for validity
 * @param id id to convert to string
 * @throws Error if id is not valid
 */

function getCheckedId(id: string) : string {

  if(!(id in objList)){
    throw new Error("Note does not exist!");
  }else{
    return id;
  }
}

/**
 * Fetches data for a single note
 * @param id : Id of the note to fetch
 */

export function getNote(id: string): unknown {
  const strId = getCheckedId(id);

  if (!(strId in objList)) {
    throw new Error("Invalid note ID");
  }

  const note = { ...objList[strId] };
  note.text = objText[strId]?.text || '';
  return note;
}



/**
 * Save a note
 * @param id : Id of the note to save
 * @param newTitle New title for the note
 * @param newText Editted text for the note
 */

export function saveNote(id: string, newTitle: string, newText: string) : string {

  // Ensure note exists (for new note case)
  if (!objList[id]) {
    objList[id] = {
      id: id,
      datetime: Utils.getDateTime(),
      title: '',
    };
  }

  if (!objText[id]) {
    objText[id] = {
      id: id,
      text: '',
    };
  }

  objList[id].title = newTitle;
  objText[id].text = newText;

  return id;
}


/**
 * Adds a blank note to the list
 * 
 * @returns id of the new note created
 */
let idCount = 4;
export function addNote() : string {
    const newId = (++idCount).toString();
    objList[newId] = 
        {id:newId,
         datetime:Utils.getDateTime(),
         title:'Untitled'};
    
    objText[newId] = {id:newId, text:''};
    return (newId);
}

/**
 * Deletes a note from the list
 * 
 * @param id : Id of the note to be deleted
 */

export function deleteNote(id: string): string {
  const checkedId = getCheckedId(id);

  if (!(checkedId in objList)) {
    throw new Error("Note does not exist!");
  }

  delete objList[checkedId];
  delete objText[checkedId];

  return checkedId;
}

