import { newSpecPage } from '@stencil/core/testing';

let addNoteCount = 0;
jest.mock('../../library/NotesData',()=>({
  addNote: () => {
    ++addNoteCount;
    return(5);
  }
}));

import { AppHome } from './app-home';


describe('app-home tests', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppHome],
      html: `<app-home></app-home>`,
    });
    expect(page.root).toEqualHtml(`
      <app-home>
        <mock:shadow-root>
          <div class="app-home">
           <button id = "app-home-add-note">+Add Note</button>
           <fsk-notes-list></fsk-notes-list>
          </div>
        </mock:shadow-root>
      </app-home>
    `);
  });

  it('should show note on receiving selectedNote event', async () => {
    const page = await newSpecPage({
      components: [AppHome],
      html: `<app-home></app-home>`,
    });

    const selectedNoteEvent = new CustomEvent(
      'selectedNote',{'detail':'1'}
    );
    page.root.dispatchEvent(selectedNoteEvent);
    await page.waitForChanges();

    expect(page.root.shadowRoot).toEqualHtml(
      `<div class="app-home">
           <button id = "app-home-add-note">+Add Note</button>
           <fsk-notes-list></fsk-notes-list>
           <fsk-note note-id="1"></fsk-note>
      </div>`
    );
  });

  it('should close note on receiving closedNote event', async () => {
    const page = await newSpecPage({
      components: [AppHome],
      html: `<app-home></app-home>`,
    });

    const selectedNoteEvent = new CustomEvent(
      'selectedNote',{'detail':'1'}
    );
    page.root.dispatchEvent(selectedNoteEvent);
    await page.waitForChanges();

    const closedNoteEvent = new CustomEvent(
      'closedNote'
    );
    page.root.dispatchEvent(closedNoteEvent);
    await page.waitForChanges();


    expect(page.root.shadowRoot).toEqualHtml(
      `<div class="app-home">
           <button id = "app-home-add-note">+Add Note</button>
           <fsk-notes-list></fsk-notes-list>
      </div>`
    );
  });

  it('should add and display new note on add note button click', async () => {
    const page = await newSpecPage({
      components: [AppHome],
      html: `<app-home></app-home>`,
    });

    const button : HTMLButtonElement = 
       page.root.shadowRoot.querySelector('#app-home-add-note');
    const oldCount = addNoteCount;
    button.click();
    await page.waitForChanges();

    expect(addNoteCount).toBe(oldCount+1);

    expect(page.root.shadowRoot).toEqualHtml(
      `<div class="app-home">
           <button id = "app-home-add-note">+Add Note</button>
           <fsk-notes-list></fsk-notes-list>
           <fsk-note note-id="5"></fsk-note>
      </div>`
    );
  });
});