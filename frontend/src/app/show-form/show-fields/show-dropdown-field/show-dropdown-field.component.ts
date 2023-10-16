import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-show-dropdown-field',
  templateUrl: './show-dropdown-field.component.html',
  styleUrls: ['./show-dropdown-field.component.css']
})
export class ShowDropdownFieldComponent {
  @Input() fieldData: { question: String, isRequired: String, id: String, options: String[] };
  @Input() elementGroup: FormGroup;

}
