import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { KeyTableService } from '../key-table.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-key-table',
  templateUrl: './manage-key-table.component.html',
  styleUrls: ['./manage-key-table.component.css'],
})
export class ManageKeyTableComponent implements OnInit {

  keyForm: FormGroup;
  isCollapsed = true;
  isAdd = true;
  data;

  constructor(private ktService: KeyTableService,
              private router: Router,
  ) { }

  ngOnInit() {
    if (this.ktService.getValueToEdit() != null) {
      this.newFormWithData(this.ktService.getValueToEdit());
      this.ktService.setValueToEdit(null, []);
    } else {
      this.newForm();
    }
  }

  newForm() {
    this.isAdd = true;
    this.keyForm = new FormGroup({
      'key': new FormControl(null, Validators.required),
      'refs': new FormArray([new FormControl(null, Validators.required)]),
    });
  }

  newFormWithData(data: any) {
    this.isAdd = false;
    this.data = data;
    this.keyForm = new FormGroup({
      'key': new FormControl(data.key, Validators.required),
      'refs': new FormArray([]),
    });
    data.ref.forEach(ref => {
      const control = new FormControl(ref, Validators.required);
      (<FormArray>this.keyForm.get('refs')).push(control);
    });
  }

  onSubmit() {
    if (this.keyForm.valid === true) {
      if (this.isAdd) {
        this.ktService.onInsert(this.keyForm.value).then(
          () => { this.refresh(); }
        );
        this.newForm();
      } else {
        this.ktService.onDelete(this.data.id);
        this.ktService.onInsert(this.keyForm.value).then(
          () => { this.refresh(); }
        );
      }
    } else {
      this.isCollapsed = false;
      setTimeout(() => {
        this.isCollapsed = true;
      }, 2000);
    }
  }

  refresh(): void {
    window.location.reload();
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
