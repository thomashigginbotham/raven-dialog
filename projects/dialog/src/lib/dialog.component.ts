import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  ElementRef,
  EventEmitter,
  HostListener
} from '@angular/core';

@Component({
  selector: 'raven-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.css']
})
export class DialogComponent implements OnInit {
  @Input()
  heading: string;

  @Input()
  delayClose: number;

  @Output()
  openChange: EventEmitter<boolean>;

  @ViewChild('dialog', { static: true })
  dialog: ElementRef;

  state: string;

  private _isOpen: boolean;
  private _isModal: boolean;

  constructor() {
    this.heading = '';
    this.openChange = new EventEmitter();

    this.delayClose = 200;
    this.state = 'default';

    this._isOpen = false;
    this._isModal = false;
  }

  get modal(): boolean {
    return this._isModal;
  }

  @Input()
  set modal(value: boolean) {
    this._isModal = value;
  }

  get open(): boolean {
    return this._isOpen;
  }

  @Input()
  set open(value: boolean) {
    this._isOpen = value;

    if (value) {
      this._openDialog();
    } else {
      this._closeDialog();
    }
  }

  ngOnInit() {
    // Check for dialog polyfill and register dialogs
    // https://www.npmjs.com/package/dialog-polyfill
    if ((<any>window).dialogPolyfill) {
      (<any>window).dialogPolyfill.registerDialog(this.dialog.nativeElement);
    }
  }

  /**
   * Event listener for esc key down on document.
   */
  @HostListener('document:keydown.escape')
  keyPress() {
    // Close dialog on esc key press
    this.openChange.emit(false);
  }

  /**
   * Event listener for click event on close button.
   */
  closeClick() {
    this.openChange.emit(false);
  }

  /**
   * Opens/shows the dialog box.
   */
  private _openDialog() {
    const dialogEl = this.dialog.nativeElement as HTMLDialogElement;

    if (this._isModal) {
      dialogEl.showModal();

      this.state = 'visible';
    } else {
      dialogEl.show();

      this.state = 'visible';
    }
  }

  /**
   * Closes/hides the dialog box.
   */
  private _closeDialog() {
    const dialogEl = this.dialog.nativeElement as HTMLDialogElement;

    this.state = 'hidden';

    setTimeout(() => {
      dialogEl.close();
      this.state = 'default'
    }, this.delayClose);
  }
}
