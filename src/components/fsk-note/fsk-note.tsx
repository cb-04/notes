import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';

/**
 * Displays a note
 */

@Component({
  tag: 'fsk-note',
  styleUrl: 'fsk-note.css',
  shadow: true,
})
export class FskNote {

  @Event() closedNote: EventEmitter;
  /** 
   * HTML property note-id: id of the note to display
  */
  @Prop() noteId: number;

  onCloseNote(){
    this.closedNote.emit()
  }

  render() {
    return (
      <div class="fsk-note">
        <header class="fsk-note-header">
          <strong>Note Title</strong>
          <nav class="fsk-close-button" onClick={() => this.onCloseNote()}>Close</nav>
        </header>
        <div class="fsk-note-content">Now displaying note: {this.noteId}<br/>
        </div>
      </div>
    );
  }
}
