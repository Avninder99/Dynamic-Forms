import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-multiple-options-field',
  templateUrl: './form-multiple-options-field.component.html',
  styleUrls: ['./form-multiple-options-field.component.css']
})
export class FormMultipleOptionsFieldComponent implements OnInit {

  @Input() elementGroup: FormGroup;
  @Output() deleteElementEmitter: EventEmitter<{ id: string }> = new EventEmitter<{ id: string }>();
  
  ngOnInit() {
    if( (this.elementGroup.value.type === 'radioButtons' || this.elementGroup.value.type === 'dropdown' || this.elementGroup.value.type === 'checkboxes') && this.elementGroup.value.options.length < 1){
      console.log('multioption field add as it was empty');
      (<FormArray>this.elementGroup.get('options')).push(
        new FormControl('Option', Validators.required)
      )
    }
  }

  addInput() {
    console.log(this.elementGroup);
    (<FormArray>this.elementGroup.get('options')).push(
      new FormControl('Option', Validators.required)
    )
  }

  deleteInput(index: number) {
    (<FormArray>this.elementGroup.get('options')).removeAt(index);
    console.log('deleted - ', index);
    console.log(this.elementGroup)
  }

  deleteElement(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.deleteElementEmitter.emit({ id: this.elementGroup.value.id })
  }

  // getItems() {
  //   console.log(this.optionsGroup);
  //   return this.optionsGroup.get('options') as FormArray;
  // }


  // commented for taking the validation logic out of it, then i can delete it

  // finalizeElement() {
  //   if(this.elementGroup.valid){
  //     this.elementEmitter.emit({ myFormGroup: this.elementGroup, id: 'placeholder_for_now', index: this.index });
  //   }else{
  //     alert('Please fill all the created fields properly')
  //   }
  // }
}
