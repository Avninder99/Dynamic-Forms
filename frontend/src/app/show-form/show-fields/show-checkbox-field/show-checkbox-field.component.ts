import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-show-checkbox-field',
  templateUrl: './show-checkbox-field.component.html',
  styleUrls: ['./show-checkbox-field.component.css']
})
export class ShowCheckboxFieldComponent {
  @Input() fieldData: { question: String, isRequired: String, id: String, options: string[] };
  @Input() elementGroup: FormGroup;

  checkedOptions: String[] = [];

  ngOnInit() {
    this.elementGroup.addControl('optionsHolder', new FormGroup({}));

    this.fieldData.options.forEach((option: string) => {
      (<FormGroup>this.elementGroup.get('optionsHolder')).addControl(option, new FormControl(false));
    });

    console.log(this.elementGroup);

    this.elementGroup.get('optionsHolder').valueChanges.subscribe((data) => {
      console.log(data);
      this.elementGroup.get('answer').patchValue(this.elementGroup.get('optionsHolder').value)
    })
  }

  stringCast(data: any): string {
    // console.log(data)
    return data;
  }

}
