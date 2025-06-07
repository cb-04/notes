import { Component, h, Prop } from '@stencil/core';

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
  render() {
    return (
      <div class="fsk-note">
        <header class="fsk-note-header">
          <strong>Note Title</strong>
          <nav class="fsk-close-button">Close</nav>
        </header>
        <div class="fsk-note-content">Now displaying note: {this.noteId}<br/>
        </div>
      </div>
    );
  }
}
