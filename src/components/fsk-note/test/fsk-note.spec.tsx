import { newSpecPage } from '@stencil/core/testing';

const list = JSON.parse(
   `[
   {"id":"1","datetime":"2020-03-01%10:10","title":"My First Note","text":"Text for My First Note"},
   {"id":"2","datetime":"2020-03-02%11:11","title":"My Second Note","text":"Text for My Second Note"},
   {"id":"3","datetime":"2020-03-03%12:12","title":"My Third Note","text":"Text for My Third Note"},
   {"id":"4","datetime":"2020-03-04%13:13","title":"My Fourth Note","text":"Text for My Fourth Note"}
   ]`
);

const saveOut = [];
const deleteSpy = jest.fn();
jest.mock('../../../library/NotesData', () => ({
  getNote: async (id:number) => {return list[id-1]},
  saveNote: (id:number, title:string, text:string) => {
    const saved : {id:number, title:string, text:string} = {id, title, text};
    saveOut.push(saved);
  },
  deleteNote: deleteSpy,
}));
import { FskNote } from '../fsk-note';

describe('fsk-note', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FskNote],
      html: `<fsk-note note-id="1"></fsk-note>`,
    });
    expect(page.root).toEqualHtml(`
      <fsk-note note-id="1">
        <mock:shadow-root>
        <div class="note-container animate-open">
          <div class="fsk-note">
           <header class="fsk-note-header">
             <input id="fsk-note-title" value="My First Note"/>
             <nav id="fsk-note-delete" class="fsk-close-button">Delete</nav>
             <nav id="fsk-note-save" class="fsk-close-button">Save</nav>
             <nav id="fsk-note-close" class="fsk-close-button">Close</nav>
           </header>
          <textarea id="fsk-note-content">Text for My First Note</textarea>
          </div>
        </div>
        </mock:shadow-root>
      </fsk-note>
    `);
  });

  it('should emit event when the close button is clicked', async () => {
    const page = await newSpecPage({
      components: [FskNote],
      html: `<fsk-note note-id="1"></fsk-note>`
    });

    const button : HTMLElement
       = (page.root.shadowRoot.querySelector("#fsk-note-close"));
    const spy = jest.fn();
    page.win.addEventListener('closedNote',spy);

    button.click();
    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should save note when save button is clicked', async () => {
    //Fetching the page
    const page = await newSpecPage({
      components: [FskNote],
      html: `<fsk-note note-id="1"></fsk-note>`,
    });
    //Changing values for the title and the content of the note
    const title: HTMLInputElement = 
      (page.root.shadowRoot.querySelector('#fsk-note-title'));
    title.value = "Test Note Title";

    const content: HTMLInputElement = 
      (page.root.shadowRoot.querySelector('#fsk-note-content'));
    content.value = "Test Note Content";

    //Click on the save button
    const button : HTMLElement = 
      (page.root.shadowRoot.querySelector('#fsk-note-save'));
    button.click();
    await page.waitForChanges();

    //Check results are as expected
    const expectedSave = 
       {id:1, title:'Test Note Title', text:'Test Note Content'};
    expect(saveOut).toEqual([expectedSave]);
  });

  it('should delete note when delete button is clicked', async () => {
    const page = await newSpecPage({
      components: [FskNote],
      html: `<fsk-note note-id="1"></fsk-note>`,
    });

    const deleteEvent = jest.fn();
    page.root.addEventListener('deletedNote', deleteEvent);

    const deleteBtn: HTMLElement = page.root.shadowRoot.querySelector('#fsk-note-delete');
    deleteBtn.click();
    await page.waitForChanges();
    
    expect(deleteEvent).toHaveBeenCalled();
  });


});
