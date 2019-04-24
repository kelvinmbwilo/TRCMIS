import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { fadeIn } from '../../animations/router-animation';

@Component({
  selector: 'app-save-area',
  templateUrl: './save-area.component.html',
  styleUrls: ['./save-area.component.scss'],
  animations: [fadeIn],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SaveAreaComponent {
  @Input() saveDisabled = false;
  @Input() confirmFirst = false;
  @Input() saveText = 'Save';
  @Input() saveIcon = 'save';
  @Input() cancelText = 'Cancel';
  @Input() showCancel: boolean = true;
  @Input() confirmText = 'Are you sure you want to perform this action?';
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  showConfirm = false;
  constructor() {}

  onSave(sendRequest = false) {
    if (this.confirmFirst && sendRequest) {
      this.showConfirm = true;
    } else {
      this.save.emit();
    }
  }

  onClose() {
    this.cancel.emit();
  }
}
