import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'board-not-found',
  template: `
    <div class="text-container">
      <h1>404</h1>
      <h2>BOARD NOT FOUND</h2>
    </div>
  `,
  styleUrls: ['./board-not-found.component.scss'],
  host: { 'class': 'board-not-found' },
  encapsulation: ViewEncapsulation.None
})
export class BoardNotFoundComponent {}
