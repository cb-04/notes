import { Component, h, Listen, State } from '@stencil/core';
import { addNote } from '../../library/NotesData'; 
//import { Router } from "../../";

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  /** 
   * Will cause render to display the contents of a note
  */
  @State() noteDisplay = '';
  /**
   * Event handler for selectedNote event
   * @param event - selectedNote event received when user selects note
   */
  @Listen('selectedNote')
      onSelectedNote(event:CustomEvent){
        this.noteDisplay = <fsk-note note-id={event.detail}></fsk-note>
      }
  /**
   * Event handler for closedNote event
   */
  @Listen('closedNote')
      onClosedNote() {
        this.noteDisplay = null;
      }

  /**
   * Event handler for addNote button press
   */
  onAddNote(){
    const noteId = addNote();
    this.noteDisplay = <fsk-note note-id={noteId}></fsk-note>
  }

  render() {
    return(
      <div class="app-home">
        <button id = "app-home-add-note" onClick={() => this.onAddNote()}>+Add Note</button>
        <fsk-notes-list></fsk-notes-list>
        {this.noteDisplay}
      </div>
    );
  }
}
