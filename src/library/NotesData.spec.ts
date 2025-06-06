import * as notesData from './NotesData';

describe('NotesData Tests',()=>{
    const expectedData = JSON.parse(`[
   {"id":"1","datetime":"2020-03-01%10:10","title":"My First Note"},
   {"id":"2","datetime":"2020-03-02%11:11","title":"My Second Note"},
   {"id":"3","datetime":"2020-03-03%12:12","title":"My Third Note"},
   {"id":"4","datetime":"2020-03-04%13:13","title":"My Fourth Note"}
]`);
    test('getList returns expected data', async ()=> {
        expect(notesData.getList()).toEqual(expectedData);
    });
}); 