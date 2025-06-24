
import * as data from './data';

describe('Data Tests',()=>{
  beforeEach(async () => {
  await data.reset();
});

    const expectedData = JSON.parse(`[
   {"title":"My First Note"},
   {"title":"My Second Note"},
   {"title":"My Third Note"},
   {"title":"My Fourth Note"}
]`);
    test('getList returns expected data', async () => {
    const list = await data.getList();
    expect(list.length).toBe(4);
    for(let i=0; i<list.length; ++i)
      expect(list[i].title).toBe(expectedData[i].title);
  });

  test('getNote returns expected note', async () => {
    const expectedResults = JSON.parse(`
      {"title": "My First Note",
       "text":"Text for My First Note"}
    `);
    const list = await data.getList();
    const note = await data.getNote(list[0].id);
    expect(note.id).toBe(list[0].id);
    expect(note.datetime).toBe(list[0].datetime);
    expect(note.title).toBe(expectedResults.title);
    expect(note.text).toBe(expectedResults.text);
  });

    test('getNote returns throws error if id is invalid', async () => {
    await expect(data.getNote('-1')).rejects.toThrow('No such note!');
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
        const resetList = await data.getList();
        expect(resetList.length).toBe(4);
        for(let i=0; i<resetList.length; ++i)
        expect(resetList[i].title).toBe(expectedData[i].title);
    });
}); 