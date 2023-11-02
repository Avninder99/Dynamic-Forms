import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-show-text-field',
  templateUrl: './show-text-field.component.html',
  styleUrls: ['./show-text-field.component.css']
})
export class ShowTextFieldComponent {
  @Input() fieldData: { question: string, isRequired: string, id: string };
  @Input() elementGroup: FormGroup;
}
