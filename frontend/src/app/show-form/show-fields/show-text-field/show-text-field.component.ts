import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from 'src/app/interfaces/form-field';

@Component({
  selector: 'app-show-text-field',
  templateUrl: './show-text-field.component.html',
  styleUrls: ['./show-text-field.component.css']
})
export class ShowTextFieldComponent {
  @Input() fieldData: FormField;
  @Input() elementGroup: FormGroup;
}
