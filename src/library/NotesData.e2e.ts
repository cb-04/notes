import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8080';

import * as notesData from './NotesData';

describe('NotesData Integration Tests', () => {
  const expectedData = JSON.parse(
    `[
      {"id":"1","datetime":"2020-03-01%10:10","title":"My First Note"},
      {"id":"2","datetime":"2020-03-02%11:11","title":"My Second Note"},
      {"id":"3","datetime":"2020-03-03%12:12","title":"My Third Note"},
      {"id":"4","datetime":"2020-03-04%13:13","title":"My Fourth Note"}
    ]`    
  );

  beforeEach(async () => {
    await axios.put('/test/reset');
  });

  afterAll(async () => {
    await axios.put('/test/reset');
  })

  it('should get a Notes List', async () => {
    const data = await notesData.getList();
    expect(data).toEqual(expectedData);
  });

  it('should get a note or get an error', async () => {
    const expectedNote = JSON.parse(`
      {"datetime": "2020-03-01%10:10", "id": "1", "title": "My First Note",
       "text":"Text for My First Note"}
    `);

    // Test we get a note as expected
    const data = await notesData.getNote(1);
    expect(data).toEqual(expectedNote);

    // Test that a bad id returns an error from the server
    try {
      await notesData.getNote(-1);
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data).toBe(-1);
    }
  });
});
