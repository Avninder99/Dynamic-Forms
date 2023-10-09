import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-dropdown-field',
  templateUrl: './form-dropdown-field.component.html',
  styleUrls: ['./form-dropdown-field.component.css']
})
export class FormDropdownFieldComponent {
  optionsGroup: FormGroup;

  @Input() fields: string[] = []
  @Output() optionsEmitter: EventEmitter<FormArray> = new EventEmitter<FormArray>();

  ngOnInit() {
    this.optionsGroup = new FormGroup({
      options: new FormArray([])
    })
    if(this.fields && this.fields.length){
      console.log(this.fields)
      this.fields.forEach((field) => {
        (<FormArray>this.optionsGroup.get('options')).push(
          new FormControl(field, Validators.required)
        )
      })
    }else{
      (<FormArray>this.optionsGroup.get('options')).push(
        new FormControl(null, Validators.required)
      )
    }
  }

  // getItems() {
  //   console.log(this.optionsGroup);
  //   return this.optionsGroup.get('options') as FormArray;
  // }

  addInput() {
    console.log(this.optionsGroup);
    (<FormArray>this.optionsGroup.get('options')).push(
      new FormControl(null, Validators.required)
    )
  }

  deleteInput(index: number) {
    (<FormArray>this.optionsGroup.get('options')).removeAt(index);
    this.emitOptions();
    console.log('deleted');
    console.log(this.optionsGroup)
  }

  emitOptions() {
    console.log(this.optionsGroup.value)
    console.log('emitted')
    this.optionsEmitter.emit(this.optionsGroup.get('options') as FormArray);
  }

}
