import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-text-field',
  templateUrl: './form-text-field.component.html',
  styleUrls: ['./form-text-field.component.css']
})
export class FormTextFieldComponent {

  @Input() index: number = -1;
  @Input() elementGroup: FormGroup;

  @Output() elementEmitter: EventEmitter<{
    myFormGroup: FormGroup,
    id: string,
    index: number
  }> = new EventEmitter<{
    myFormGroup: FormGroup,
    id: string,
    index: number
  }>();
  @Output() deleteElementEmitter: EventEmitter<{ id: string }> = new EventEmitter<{ id: string }>();

  // finalizeElement() {
  //   if(this.elementGroup.valid){
  //     this.elementEmitter.emit({ myFormGroup: this.elementGroup, id: 'placeholder_for_now', index: this.index });
  //   }else{
  //     alert('Please fill all the created fields properly')
  //   }
  // }

  deleteElement(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.deleteElementEmitter.emit({ id: this.elementGroup.value.id })
  }
}
