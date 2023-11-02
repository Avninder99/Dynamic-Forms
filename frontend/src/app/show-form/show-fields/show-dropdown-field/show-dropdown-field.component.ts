import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-show-dropdown-field',
  templateUrl: './show-dropdown-field.component.html',
  styleUrls: ['./show-dropdown-field.component.css']
})
export class ShowDropdownFieldComponent {
  @Input() fieldData: { question: string, isRequired: string, id: string, options: string[] };
  @Input() elementGroup: FormGroup;

}
