import { Component, h } from '@stencil/core';
import {getList} from '../../library/NotesData';

/**
 * Lists notes
*/

@Component({
  tag: 'fsk-notes-list',
  styleUrl: 'fsk-notes-list.css',
  shadow: true,
})
export class FskNotesList {
  render() {
    const notes = getList();
    return (
      <div>
        <div>Notes List</div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Date/Time</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note:any, index:number)=>
              <tr>
                <td>{index+1}</td>
                <td>{note.datetime}</td>
                <td>{note.title}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
