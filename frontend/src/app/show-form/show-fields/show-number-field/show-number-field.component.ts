import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from 'src/app/interfaces/form-field';

@Component({
  selector: 'app-show-number-field',
  templateUrl: './show-number-field.component.html',
  styleUrls: ['./show-number-field.component.css']
})
export class ShowNumberFieldComponent {
  @Input() fieldData: FormField;
  @Input() elementGroup: FormGroup;

  
}
