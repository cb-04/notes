import * as Utils from './Utils';
import { randomUUID } from 'crypto';

// Get database object
const db = new Utils.DBConnect();

/**
 * Data library for notes
 * @packagedocumentation
 */
/** 

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
interface updateResponse {
  message: string,
  skipped_hashes: Array<string>,
  update_hashes: Array<string>
}

export async function saveNote(id: string, newTitle: string, newText: string) : Promise<string> {
  const response = <updateResponse> await db.send({
    "operation":"sql",
    "sql":`
        UPDATE notes.notes
        SET title = '${newTitle}', text = '${newText}'
        WHERE id = '${id}'
    `
   });

   if(response.update_hashes.length == 1)
      return response.update_hashes[0];
   else
      throw new Error('Note does not exist!');
}


/**
 * Adds a blank note to the list
 * 
 * @returns id of the new note created
 */
interface insertResponse {
  message: string,
  skipped_hashes: Array<string>,
  inserted_hashes: Array<string>
}
export async function addNote(): Promise<note> {
  const newId = randomUUID();

  // Insert the note
  await db.send({
    operation: "sql",
    sql: `
      INSERT INTO notes.notes (id, title, text)
      VALUES ('${newId}', 'Untitled', '')
    `
  });

  // Now fetch using known ID
  const result = await db.send({
    operation: "sql",
    sql: `
      SELECT id, __createdtime__ AS datetime, title, text
      FROM notes.notes
      WHERE id = '${newId}'
      LIMIT 1
    `
  }) as note[];

  if (result.length === 1) return result[0];
  else throw new Error("Insert failed");
}





/**
 * Deletes a note from the list
 * 
 * @param id : Id of the note to be deleted
 */
interface deleteResponse {
  message: string,
  skipped_hashes: Array<string>,
  deleted_hashes: Array<string>
}
export async function deleteNote(id: string): Promise<string> {
  const check = await db.send({
    operation: "sql",
    sql: `
      SELECT id FROM notes.notes WHERE id = '${id}'
    `
  });

  if (!Array.isArray(check) || check.length === 0)
    throw new Error('Note does not exist!');

  const response = <deleteResponse> await db.send({
    operation: "sql",
    sql: `
      DELETE FROM notes.notes
      WHERE id='${id}'
    `
  });

  if (response.deleted_hashes.length === 1)
    return response.deleted_hashes[0];
  else
    throw new Error('Failed to delete note!');
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
