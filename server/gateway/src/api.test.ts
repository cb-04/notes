import {app} from './app';
import request from 'supertest';

describe('Gateway API Tests', () => {
    it('should get the notes list', async () => {

        const expectedData = JSON.parse(
        `[
        {"id":"1","datetime":"2020-03-01%10:10","title":"My First Note"},
        {"id":"2","datetime":"2020-03-02%11:11","title":"My Second Note"},
        {"id":"3","datetime":"2020-03-03%12:12","title":"My Third Note"},
        {"id":"4","datetime":"2020-03-04%13:13","title":"My Fourth Note"}
        ]`
    );
        const response = await request(app).get('/api/list');
        expect(response.status).toBe(200);
        expect(response.text).toBe(JSON.stringify(expectedData));
    });

    it('should get a note', async () => {
        const expectedData = JSON.parse(`
        {"id": "1", "datetime": "2020-03-01%10:10", "title":"My First Note", "text":"Text for My First Note"}    
    `);

        const response = await request(app).get('/api/note/1');
        expect(response.status).toBe(200);
        expect(response.text).toBe(JSON.stringify(expectedData));
    });

    it('should get an error if the note does not exist', async () => {
        const response = await request(app).get('/api/note/-1');
        expect(response.status).toBe(404);
        expect(response.text).toBe("-1");
    });

    it('should add a note', async () => {
        const response = await request(app).post('/api/note/add');
        expect(response.status).toBe(201);
        expect(response.text).toBe('add new note');
    });

    it('should save a note', async () => {
        const response = await request(app).put('/api/note/save/1');
        expect(response.status).toBe(200);
        expect(response.text).toBe('save note:1');
    });

    it('should delete a note', async () => {
        const response = await request(app).delete('/api/note/1');
        expect(response.status).toBe(200);
        expect(response.text).toBe('deleted note:1');
    });
});