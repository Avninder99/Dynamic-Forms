import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-number-field',
  templateUrl: './form-number-field.component.html',
  styleUrls: ['./form-number-field.component.css']
})
export class FormNumberFieldComponent {
  @Input() index: number = -1;
  @Input() elementGroup: FormGroup;

  @Output() answerAndOptionsEmitter: EventEmitter<{ answer: FormControl, options: string[] }> = new EventEmitter<{ answer: FormControl, options: string[] }>()
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
