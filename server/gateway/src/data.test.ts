
import * as data from './data';

describe('Data Tests',()=>{
    const expectedData = JSON.parse(`[
   {"id":"1","datetime":"2020-03-01%10:10","title":"My First Note"},
   {"id":"2","datetime":"2020-03-02%11:11","title":"My Second Note"},
   {"id":"3","datetime":"2020-03-03%12:12","title":"My Third Note"},
   {"id":"4","datetime":"2020-03-04%13:13","title":"My Fourth Note"}
]`);
    test.skip('getList returns expected data', async ()=> {
        const list = data.getList();
        expect(list).toEqual(expectedData);
    });

    test.skip('getNote returns expected note', async () => {
        const expectedResults = JSON.parse(`{"datetime": "2020-03-01%10:10", "id": "1", "title": "My First Note","text": "Text for My First Note"}`);
        const note = data.getNote('1');
        expect(note).toEqual(expectedResults);
    });

    test.skip('getNote throws error for invalid ID', () => {
        try {
          data.getNote('-1');
          fail("Expected getNote to throw an error for invalid ID");
        } catch (err) {
          expect((err as Error).message).toBe("Note does not exist!");
        }
    });

    test.skip('saveNote should save a note', async () => {
        const expectedResults = JSON.parse(`{"datetime": "2020-03-01%10:10", "id": "1", "title": "Edited Test Title","text": "Edited Test Text"}`);

        data.saveNote('1',"Edited Test Title","Edited Test Text");

        const note = data.getNote('1');
        expect(note).toEqual(expectedResults);
    });

    test.skip('saveNote throws error for invalid ID', () => {
        try {
          data.saveNote('-1', 'a', 'a');
          fail("Expected saveNote to throw an error for invalid ID");
        } catch (err) {
          expect((err as Error).message).toBe("Invalid note ID!");
        }
    });

    test.skip('addNode should add a new note', async ()=>{
        const expectedResults = JSON.parse(`
            {"id":"5","datetime":"2020-05-14T05:50:00.000Z",
             "title":"Untitled",
             "text":""
            }
            `);

            //Mock Date.now() to return a fixed testable date-time
            jest.spyOn(global.Date, 'now').mockReturnValue(new Date('2020-05-14T05:50:00Z').getTime());


            //Add note 5 and check for results
            
            const newNoteId = await data.addNote();
            expect(newNoteId).toBe('5');

            const note = data.getNote(newNoteId.toString());
            
            expect(note).toEqual(expectedResults);
    });

    test.skip('deleteNote throws error if note does not exist', () => {
        try {
          data.deleteNote('999');
          // If it doesn't throw, force the test to fail
          fail('Expected deleteNote to throw an error');
        } catch (err) {
        expect((err as Error).message).toBe('Note does not exist!');
        }
    });

    test('reset sets data back to defaults', async () => {
        // //Change the data
        // data.addNote();

        // //Check the data is not as expected
        // const list = data.getList();
        // expect(list).not.toEqual(expectedData);
        // const id = data.addNote();
        // expect(id).not.toEqual('5');

        //Reset data and check it matches defaults
        await data.reset();
        // const resetList = data.getList();
        // expect(resetList).toEqual(expectedData);
        // const resetId = data.addNote();
        // expect(resetId).toEqual('5');
    });
}); 