import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {formSize, tableSize} from '../../animations/router-animation';

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.scss'],
  animations: [
    formSize, tableSize
  ]
})
export class TableFormComponent implements OnInit {

  @Input() title: string;
  @Input() image: string;
  @Input() loading = false;
  @Input() formTitle: string;
  @Input() showTopBanner: boolean = true;

  @Input() viewDetails: boolean = false;
  @Input() hideAdd: boolean = false;
  @Input() smallForm: boolean = true;

  @Output() addItem = new EventEmitter();
  @Output() close = new EventEmitter();
  @Input() animationSize: 'eighty' | 'sixty' | 'largeForm' | 'full' = 'sixty';
  constructor() { }

  ngOnInit() {
  }


  closeForm() {
    this.close.emit();
  }

  add() {
    this.addItem.emit();
  }

}
