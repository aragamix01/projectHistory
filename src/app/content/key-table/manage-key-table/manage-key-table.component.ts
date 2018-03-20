import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-key-table',
  templateUrl: './manage-key-table.component.html',
  styleUrls: ['./manage-key-table.component.css']
})
export class ManageKeyTableComponent implements OnInit {

  keyForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.keyForm = new FormGroup({
      'key': new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    console.log(this.keyForm);
  }
}
