import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import {getNote} from '../../library/NotesData';

/**
 * Displays a note
 */

@Component({
  tag: 'fsk-note',
  styleUrl: 'fsk-note.css',
  shadow: true,
})
export class FskNote {

  /** 
   * HTML property note-id: id of the note to display
  */
  @Prop() noteId: number;

  /** Sent when user clicks on Close button
   * @event 
  */

  @Event() closedNote: EventEmitter;

  /**
   * Called from HTML when user clicks on the Close button
   */

  onCloseNote(){
    this.closedNote.emit()
  }

  render() {
    const note = getNote(this.noteId);
    return (
      <div class="note-container animate-open">
        <div class="fsk-note">
        <header class="fsk-note-header">
          <input value={note.title}/>
          <nav class="fsk-close-button" onClick={() => this.onCloseNote()}>Close</nav>
        </header>
        <textarea class="fsk-note-content">
          {note.text}
        </textarea>
        </div>
      </div>
    );
  }
}
