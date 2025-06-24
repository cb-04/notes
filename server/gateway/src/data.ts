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
 * 
 * @returns array of noteListItem
 */

export interface noteListItem {
  id: string,
  datetime: number,
  title: string
}
export async function getList() : Promise<noteListItem[]> {
  const response = await db.send({
    "operation":"sql",
    "sql":`
      SELECT id,__createdtime__ AS datetime,title
      FROM notes.notes
      ORDER BY datetime
    `
  });
  return(<noteListItem[]>response);
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

export interface note {
  id: string,
  datetime: number,
  title: string,
  text: string
}
export async function getNote(id: string) : Promise<note> {
  const response = <note[]> await db.send({
    "operation":"sql",
    "sql":`
      SELECT id,__createdtime__ AS datetime,title,text
      FROM notes.notes
      WHERE id='${id}'
    `
  });
  //console.log(`getNote( ${id} ) response:\n`+JSON.stringify(response,null,2));
  if(response.length == 0)
    throw new Error('No such note!');
  else
    return(response[0]);
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
    {"id":"1","title":"My First Note","text":"Text for My First Note"},
    {"id":"2","title":"My Second Note","text":"Text for My Second Note"},
    {"id":"3","title":"My Third Note","text":"Text for My Third Note"},
    {"id":"4","title":"My Fourth Note","text":"Text for My Fourth Note"} 
  ]`);

export async function reset(): Promise<void> {
  console.log("Resetting DB...");
  await db.send({
    operation: "sql",
    sql: "DELETE FROM notes.notes"
  });

  for (let i = 0; i < dbResetData.length; ++i) {
    const { id, title, text } = dbResetData[i];
    const insertSQL = `
      INSERT INTO notes.notes (id, title, text)
      VALUES('${id}', '${title}', '${text}')
    `;
    const response = await db.send({
      operation: "sql",
      sql: insertSQL
    });
  }
}
