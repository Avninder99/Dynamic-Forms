import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from 'src/app/interfaces/form-field';

@Component({
  selector: 'app-show-dropdown-field',
  templateUrl: './show-dropdown-field.component.html',
  styleUrls: ['./show-dropdown-field.component.css']
})
export class ShowDropdownFieldComponent {
  @Input() fieldData: FormField;
  @Input() elementGroup: FormGroup;
}
