import express from 'express';
import * as data from './data';
export const router = express.Router();

router.get('/list', async (req,res) => {
  res.json(await data.getList());
});

router.get('/note/:id', async (req, res) => {
  try {
    const id = req.params.id;
    res.json(await data.getNote(id));
  } catch (error) {
    res.status(404).send(req.params.id);
  }
});


router.post('/note/add', async (req,res) => {
  const note = await data.addNote();
  res.status(201).send(note.id); 
});



router.put('/note/save/:id', async (req,res) => {
  try {
    const id = await data.saveNote(req.params.id, req.body.title, req.body.text);
    res.send(id);
  } catch(error) {
    res.status(404).send(req.params.id);
  }
});

router.delete('/note/:id', async (req,res) => {
  try {
    const id = await data.deleteNote(req.params.id);
    res.send(id);  
  } catch {
    res.status(404).send(req.params.id);
  }
});
