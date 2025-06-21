import axios from 'axios';
const mock = jest.spyOn(axios,'get');

import * as notesData from './NotesData';

describe('NotesData Tests',()=>{
    const expectedData = JSON.parse(`[
   {"id":"1","datetime":"2020-03-01%10:10","title":"My First Note"},
   {"id":"2","datetime":"2020-03-02%11:11","title":"My Second Note"},
   {"id":"3","datetime":"2020-03-03%12:12","title":"My Third Note"},
   {"id":"4","datetime":"2020-03-04%13:13","title":"My Fourth Note"}
]`);
    test('getList returns expected data', async ()=> {
        mock.mockResolvedValue({data: 'list'});
        const data = await notesData.getList();
        expect(data).toEqual(expectedData);
    });

    test('getNote returns expected note', async () => {
        const expectedResults = JSON.parse(`{"datetime": "2020-03-01%10:10", "id": "1", "title": "My First Note","text": "Text for My First Note"}`);
        mock.mockResolvedValue({data: 'note'});
        const note = await notesData.getNote(1);
        expect(note).toEqual(expectedResults);
    });

    test('getNote returns empty object if id is invalid', async () => {
        mock.mockResolvedValue({data: 'invalid id'});
        const note = await notesData.getNote(-1);
        expect(Object.keys(note).length).toBe(0);
    });

    test('saveNote should save a note', async () => {
        const expectedResults = JSON.parse(`{"datetime": "2020-03-01%10:10", "id": "1", "title": "Edited Test Title","text": "Edited Test Text"}`);

        const putMock = jest.spyOn(axios,'put');
        putMock.mockResolvedValue({data: 'putMock'});

        notesData.saveNote(1,"Edited Test Title","Edited Test Text");

        mock.mockResolvedValue({data: 'saved note'});
        const note = await notesData.getNote(1);
        expect(note).toEqual(expectedResults);
    })

    test('addNode should add a new note', async ()=>{
        const expectedResults = JSON.parse(`
            {"id":"5","datetime":"2020-05-14T05:50:00.000Z",
             "title":"Untitled",
             "text":""
            }
            `);

            //Mock Date.now() to return a fixed testable date-time
            jest.spyOn(global.Date, 'now')
                .mockImplementationOnce(() => 
                    new Date('2020-05-14%11:20').valueOf()
                );

            //Mock axios.post
            const postMock = jest.spyOn(axios, 'post');
            postMock.mockResolvedValue({data: 'added note'});

            //Add note 5 and check for results
            
            const newNoteId = await notesData.addNote();
            expect(newNoteId).toBe(5);

            mock.mockResolvedValue({data: 'added note'});
            const note = await notesData.getNote(newNoteId);
            
            expect(note).toEqual(expectedResults);
    });

    test('deleteNote deletes the right note', async () => {

        const deleteMock = jest.spyOn(axios,'delete');
        deleteMock.mockResolvedValue({data: 'deleteMock'});
    
        await notesData.deleteNote(2);

        mock.mockResolvedValue({data: 'deleted note'});
        const note = await notesData.getNote(2);

        expect(Object.keys(note).length).toBe(0);

    });

}); 