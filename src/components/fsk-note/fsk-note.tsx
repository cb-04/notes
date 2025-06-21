import { Component, h, Prop, Event, EventEmitter, Element, State } from '@stencil/core';
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

  /** Note to render*/
  @State() note : any;

  /** Fetch note from server before render*/
  async componentWillLoad() {
    if (this.noteId !== undefined && this.noteId !== null) {
    const response = await getNote(this.noteId);
    this.note = response;
    } else {
    // New note mode: start with blank state
    this.note = {
      title: '',
      text: ''
    };
  }
  }

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
  async onSaveNote(){
    const root = this.el.shadowRoot;
    const title: HTMLInputElement = root.querySelector('#fsk-note-title');
    const text: HTMLInputElement = root.querySelector('#fsk-note-content');

    // If it's a new note, generate a new ID
    if (this.noteId === undefined) {
      this.noteId = Date.now(); // or use a custom ID generator
    }

  await saveNote(this.noteId, title.value, text.value);
  this.savedNote.emit();
  }
  async onDeleteNote(){
    await deleteNote(this.noteId);
    this.deletedNote.emit();
    this.closedNote.emit();
  }

  render() {
  const title = this.note?.title || '';
  const text = this.note?.text || '';

  return (
    <div class="note-container animate-open">
      <div class="fsk-note">
        <header class="fsk-note-header">
          <input
            id="fsk-note-title"
            value={title}
          />
          <nav
            id="fsk-note-delete"
            class="fsk-close-button"
            onClick={() => this.onDeleteNote()}
            style={{ display: this.noteId !== undefined ? 'inline' : 'none' }}
          >
            Delete
          </nav>
          <nav
            id="fsk-note-save"
            class="fsk-close-button"
            onClick={() => this.onSaveNote()}
          >
            Save
          </nav>
          <nav
            id="fsk-note-close"
            class="fsk-close-button"
            onClick={() => this.onCloseNote()}
          >
            Close
          </nav>
        </header>
        <textarea id="fsk-note-content">
          {text}
        </textarea>
      </div>
    </div>
  );
}


}
