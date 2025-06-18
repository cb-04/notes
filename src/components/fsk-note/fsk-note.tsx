import { Component, h, Prop, Event, EventEmitter, Element } from '@stencil/core';
import {getNote, saveNote, deleteNote} from '../../library/NotesData';

/**
 * Displays a note
 */

@Component({
  tag: 'fsk-note',
  styleUrl: 'fsk-note.css',
  shadow: true,
})
export class FskNote {

  @Element() el: HTMLElement;

  /** 
   * HTML property note-id: id of the note to display
  */
  @Prop() noteId: number;

  /** Sent when user clicks on Close button
   * @event 
  */

  @Event() closedNote: EventEmitter;

  /** 
   * Sent when user clicks on Save button
   * @event
  */

  @Event() savedNote: EventEmitter;

  /** 
   * Sent when user clicks on Delete button
   * @event
  */

  @Event() deletedNote : EventEmitter;

  /**
   * Called from HTML when user clicks on the Close button
   */

  onCloseNote(){
    this.closedNote.emit()
  }
  onSaveNote(){
    const root = this.el.shadowRoot;
    const title : HTMLInputElement = root.querySelector('#fsk-note-title');
    const text : HTMLInputElement = root.querySelector('#fsk-note-content');
    saveNote(this.noteId, title.value, text.value);

    this.savedNote.emit();
  }
  onDeleteNote(){
    deleteNote(this.noteId);
    this.deletedNote.emit();
    this.closedNote.emit();
  }

  render() {
    const note = getNote(this.noteId);
    return (
      <div class="note-container animate-open">
        <div class="fsk-note">
        <header class="fsk-note-header">
          <input id="fsk-note-title"value={note.title}/>
          <nav id="fsk-note-delete" class="fsk-close-button" onClick={() => this.onDeleteNote()}>Delete</nav>
          <nav id="fsk-note-save" class="fsk-close-button" onClick={() => this.onSaveNote()}>Save</nav>
          <nav id="fsk-note-close" class="fsk-close-button" onClick={() => this.onCloseNote()}>Close</nav>
        </header>
        <textarea id="fsk-note-content">
          {note.text}
        </textarea>
        </div>
      </div>
    );
  }
}
