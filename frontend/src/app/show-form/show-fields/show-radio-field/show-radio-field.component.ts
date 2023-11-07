import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from 'src/app/interfaces/form-field';

@Component({
  selector: 'app-show-radio-field',
  templateUrl: './show-radio-field.component.html',
  styleUrls: ['./show-radio-field.component.css']
})
export class ShowRadioFieldComponent {
  @Input() fieldData: FormField;
  @Input() elementGroup: FormGroup;
}
