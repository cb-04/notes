import { Component, h, Event, EventEmitter, State, Listen} from '@stencil/core';
import {getList} from '../../library/NotesData';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
//import { EventEmitter } from 'puppeteer';

dayjs.locale('en');

/**
 * Lists notes
*/

@Component({
  tag: 'fsk-notes-list',
  styleUrl: 'fsk-notes-list.css',
  shadow: true,
})

export class FskNotesList {
  /** Note list state variable */
  @State() notes = [];

  async componentWillLoad() {
    return getList().then( response => {
      this.notes = response;
    });
  }

  /** 
   * Listens to closedNote event issued by the note
  */

  @Listen('closedNote',{ target:'body' })
  async onCloseNote() {
    this.notes = await getList();
  }

  @Listen('savedNote',{target:'body'})
  async onSaveNote() {
    this.notes = await getList();
  }
  @Listen('deletedNote', { target: 'body' })
  async onDeletedNote() {
    this.notes = await getList();  
  }

  /** 
   * Sent when user selects a note by clicking on it
   * @event
  */

  @Event() selectedNote: EventEmitter;

  /**
   * Called by HTML table row when user clicks on the row
   * @param noteid - id of the note selected
   */

  onSelectNote(noteid:number){
    //console.log(noteid);
    this.selectedNote.emit(noteid)
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Date/Time</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {this.notes.map((note:any, index:number)=>
              <tr id={"note"+note.id} onClick={()=>this.onSelectNote(note.id)}>
                <td>{index+1}</td>
                <td>{dayjs(note.datetime)
                     .format('MMMM D, YYYY h:mm A')}</td>
                <td>{note.title}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
