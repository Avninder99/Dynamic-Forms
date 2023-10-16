import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-show-number-field',
  templateUrl: './show-number-field.component.html',
  styleUrls: ['./show-number-field.component.css']
})
export class ShowNumberFieldComponent {
  @Input() fieldData: { question: String, isRequired: String, id: String };
  @Input() elementGroup: FormGroup;

  
}
