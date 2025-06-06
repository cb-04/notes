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
           <div>Notes List</div>
           <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Date/Time</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
               <tr>
                 <td>1</td>
                 <td>2020-03-01%10:10</td>
                 <td>My First Note</td>
               </tr>
               <tr>
                 <td>2</td>
                 <td>2020-03-02%11:11</td>
                 <td>My Second Note</td>
               </tr>
               <tr>
                 <td>3</td>
                 <td>2020-03-03%12:12</td>
                 <td>My Third Note</td>
               </tr>
               <tr>
                 <td>4</td>
                 <td>2020-03-04%13:13</td>
                 <td>My Fourth Note</td>
               </tr>
            </tbody>
           </table>
          </div>
        </mock:shadow-root>
      </fsk-notes-list>
    `);
  });
});
