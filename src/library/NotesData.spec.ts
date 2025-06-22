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
        mock.mockResolvedValue({data: expectedData});
        const data = await notesData.getList();
        expect(data).toEqual(expectedData);
    });

    test('getNote returns expected note', async () => {
        const expectedResults = JSON.parse(`{"datetime": "2020-03-01%10:10", "id": "1", "title": "My First Note","text": "Text for My First Note"}`);
        mock.mockResolvedValue({data: expectedResults});
        const note = await notesData.getNote(1);
        expect(note).toEqual(expectedResults);
    });

    test('saveNote should save a note', async () => {

        const putMock = jest.spyOn(axios,'put');
        putMock.mockResolvedValue({data: 1});

        const saveReturn = await notesData.saveNote(1,"Edited Test Title","Edited Test Text");

        expect(saveReturn).toBe(1);
    })

    test('addNote should add a new note', async ()=>{

            //Mock axios.post
            const postMock = jest.spyOn(axios, 'post');
            postMock.mockResolvedValue({data: '5'});

            //Add note 5 and check for results
            
            const newNoteId = await notesData.addNote();
            expect(newNoteId).toBe(5);
    });

    test('deleteNote deletes the right note', async () => {

        const deleteMock = jest.spyOn(axios,'delete');
        deleteMock.mockResolvedValue({data: '2'});
    
        const noteId = await notesData.deleteNote(2);

        expect(noteId).toBe(2);

    });

}); 