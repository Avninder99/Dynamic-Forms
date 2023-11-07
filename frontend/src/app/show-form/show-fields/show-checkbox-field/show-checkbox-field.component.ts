import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormField } from 'src/app/interfaces/form-field';

@Component({
  selector: 'app-show-checkbox-field',
  templateUrl: './show-checkbox-field.component.html',
  styleUrls: ['./show-checkbox-field.component.css']
})
export class ShowCheckboxFieldComponent implements OnInit {
  @Input() fieldData: FormField;
  @Input() elementGroup: FormGroup;

  checkedOptions: string[] = [];

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
