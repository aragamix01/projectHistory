import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { KeyTableService } from '../key-table.service';

@Component({
  selector: 'app-manage-key-table',
  templateUrl: './manage-key-table.component.html',
  styleUrls: ['./manage-key-table.component.css'],
  providers: [KeyTableService]
})
export class ManageKeyTableComponent implements OnInit {

  keyForm: FormGroup;
  isCollapsed = true;

  constructor(private ktService: KeyTableService) { }

  ngOnInit() {
    this.newForm();
  }

  newForm() {
    this.keyForm = new FormGroup({
      'key': new FormControl(null, Validators.required),
      'refs': new FormArray([new FormControl(null, Validators.required)]),
    });
  }

  onSubmit() {
    if (this.keyForm.valid === true) {
      console.log(this.keyForm);
      this.ktService.onSend(this.keyForm.value);
      this.newForm();
    } else {
      this.isCollapsed = false;
      setTimeout(() => {
        this.isCollapsed = true;
      }, 2000);
    }
  }

  onAddRef() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.keyForm.get('refs')).push(control);
  }

  onRmRef(number) {
    (<FormArray>this.keyForm.get('refs')).removeAt(number);
  }

  get formRefs(): FormGroup {
    return this.keyForm.get('refs') as FormGroup;
  }
}
