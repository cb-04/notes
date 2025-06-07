
const list = JSON.parse(
   `[
   {"id":"1","datetime":"2020-03-01%10:10","title":"My First Note"},
   {"id":"2","datetime":"2020-03-02%11:11","title":"My Second Note"},
   {"id":"3","datetime":"2020-03-03%12:12","title":"My Third Note"},
   {"id":"4","datetime":"2020-03-04%13:13","title":"My Fourth Note"}
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
    return(list[id-1]);
}