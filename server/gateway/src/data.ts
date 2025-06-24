import * as Utils from './Utils';

// Get database object
const db = new Utils.DBConnect();

/**
 * Data library for notes
 * @packagedocumentation
 */
/** 
 * @ignore
*/

const listDefault = `[
   {"id":"1","datetime":"2020-03-01%10:10","title":"My First Note"},
   {"id":"2","datetime":"2020-03-02%11:11","title":"My Second Note"},
   {"id":"3","datetime":"2020-03-03%12:12","title":"My Third Note"},
   {"id":"4","datetime":"2020-03-04%13:13","title":"My Fourth Note"}
   ]`

const list = JSON.parse(listDefault);
const objList = Utils.array2Obj(list,'id');

const textDefault = `[
   {"id":"1","text":"Text for My First Note"},
   {"id":"2","text":"Text for My Second Note"},
   {"id":"3","text":"Text for My Third Note"},
   {"id":"4","text":"Text for My Fourth Note"}
   ]`

const text = JSON.parse(textDefault);
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

  if (!id || !(id in objList) || !(id in objText)) {
    throw new Error(`Invalid note ID!`);
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

/** Resets dummy data to known state */
const dbResetData = JSON.parse(`[
    {"title":"My First Note","text":"Text for My First Note"},
    {"title":"My Second Note","text":"Text for My Second Note"},
    {"title":"My Third Note","text":"Text for My Third Note"},
    {"title":"My Fourth Note","text":"Text for My Fourth Note"} 
  ]`);

export async function reset() : Promise<void> {
  // Delete all records in notes table
  let response = await db.send({
    "operation":"sql",
    "sql":"DELETE FROM notes.notes"
  });
  console.log(response);

  // Add test records
  for(let i=0; i<dbResetData.length; ++i) {
    response = await db.send({
      "operation":"sql",
      "sql":`
        INSERT INTO notes.notes (title,text)
        VALUES('${dbResetData[i].title}','${dbResetData[i].text}')
      `
    });
    console.log(response);
  }
}