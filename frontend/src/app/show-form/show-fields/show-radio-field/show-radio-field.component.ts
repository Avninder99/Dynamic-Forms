import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-show-radio-field',
  templateUrl: './show-radio-field.component.html',
  styleUrls: ['./show-radio-field.component.css']
})
export class ShowRadioFieldComponent {
  @Input() fieldData: { question: string, isRequired: string, id: string, options: string[] };
  @Input() elementGroup: FormGroup;

}
