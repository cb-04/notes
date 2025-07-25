import { Component, h } from '@stencil/core';
import { Router } from "../../";
import { Route } from "stencil-router-v2";

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: false
})
export class AppRoot {
  render() {
    return (
      <div>
        <header class="root-header">
            <h1>
              ThinkPad - A Home for your Headspace!
            </h1>
        </header>

        <main>
          <Router.Switch>
            <Route path="/">
              <app-home />
            </Route>
            
          </Router.Switch>
        </main>
      </div>
    );
  }
}
