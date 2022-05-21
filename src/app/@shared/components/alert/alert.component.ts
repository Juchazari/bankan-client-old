import { Component, Output, ViewEncapsulation, EventEmitter, Input, ElementRef, OnInit } from '@angular/core';

export enum AlertType {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error'
}

@Component({
  selector: 'bankan-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  host: { 'class': 'bankan-alert' },
  encapsulation: ViewEncapsulation.None
})
export class BankanAlertComponent implements OnInit {

  @Input() type: AlertType;

  @Input() closeable?: boolean = true;

  @Output() onClose = new EventEmitter();

  alertType: typeof AlertType = AlertType;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.getHostElement()
      .classList
      .add(this.type === AlertType.SUCCESS ? 'check_circle' : this.type);
  }

  private getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
