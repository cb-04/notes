
const list = JSON.parse(
   `[
   {"id":"1","datetime":"2020-03-01%10:10","title":"My First Note"},
   {"id":"2","datetime":"2020-03-02%11:11","title":"My Second Note"},
   {"id":"3","datetime":"2020-03-03%12:12","title":"My Third Note"},
   {"id":"4","datetime":"2020-03-04%13:13","title":"My Fourth Note"}
   ]`
);

const text = JSON.parse(
   `[
   {"id":"1","text":"Text for My First Note"},
   {"id":"2","text":"Text for My Second Note"},
   {"id":"3","text":"Text for My Third Note"},
   {"id":"4","text":"Text for My Fourth Note"}
   ]`
);

/**
 * Returns list of all notes
 */

export function getList(){
    return(list);
}

/**
 * Fetches data for a single note
 * @param id : Id of the note to fetch
 */

export function getNote(id:number){
    const note = list[id-1];
    const clonedNote = Object.assign({},note);
    clonedNote.text = text[id-1].text;
    return(clonedNote);
}

/**
 * Save a note
 * @param id : Id of the note to save
 * @param newTitle New title for the note
 * @param newText Editted text for the note
 */

export function saveNote(id:number, newTitle:string, newText:string){
    const note = list[id-1];
    note.title = newTitle;

    const noteText = text[id-1];
    noteText.text = newText;
}