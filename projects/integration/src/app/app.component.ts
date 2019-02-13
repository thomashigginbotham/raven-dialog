import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isOpen: boolean;
  isModal: boolean;

  constructor() {
    this.isOpen = false;
    this.isModal = false;
  }

  openClick() {
    this.isModal = false;
    this.isOpen = true;
  }

  openModalClick() {
    this.isModal = true;
    this.isOpen = true;
  }

  closeClick() {
    this.isOpen = false;
    this.isModal = false;
  }
}
