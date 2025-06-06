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
    return (
      <div>
        <div>Notes List</div>
        <table>
          <thead>
            <tr>
              <th>{getList()}</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}
