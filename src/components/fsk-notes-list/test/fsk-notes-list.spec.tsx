import { newSpecPage } from '@stencil/core/testing';


jest.mock('../../../library/NotesData', ()=>({
  getList: () => JSON.parse(
    `[
      {"id":"1","datetime":"2020-03-01%10:10","title":"My First Note"},
      {"id":"2","datetime":"2020-03-02%11:11","title":"My Second Note"},
      {"id":"3","datetime":"2020-03-03%12:12","title":"My Third Note"},
      {"id":"4","datetime":"2020-03-04%13:13","title":"My Fourth Note"}
    ]`
  )
}));


import { FskNotesList } from '../fsk-notes-list';



describe('fsk-notes-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FskNotesList],
      html: `<fsk-notes-list></fsk-notes-list>`,
    });
    expect(page.root).toEqualHtml(`
      <fsk-notes-list>
        <mock:shadow-root>
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
               <tr id="note1">
                 <td>1</td>
                 <td>March 1, 2020 10:10 AM</td>
                 <td>My First Note</td>
               </tr>
               <tr id="note2">
                 <td>2</td>
                 <td>March 2, 2020 11:11 AM</td>
                 <td>My Second Note</td>
               </tr>
               <tr id="note3">
                 <td>3</td>
                 <td>March 3, 2020 12:12 PM</td>
                 <td>My Third Note</td>
               </tr>
               <tr id="note4">
                 <td>4</td>
                 <td>March 4, 2020 1:13 PM</td>
                 <td>My Fourth Note</td>
               </tr>
            </tbody>
           </table>
          </div>
        </mock:shadow-root>
      </fsk-notes-list>
    `);
  });

  it('should handle row click', async ()=>{
    const page = await newSpecPage({
      components: [FskNotesList],
      html: `<fsk-notes-list></fsk-notes-list>`,
    });

    const row : HTMLElement = (page.root.shadowRoot.querySelector("#note1"));
    const spy = jest.fn();
    page.win.addEventListener('selectedNote',spy);
    row.click();
    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toBe('1');
  });
});
