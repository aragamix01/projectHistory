import { Component, OnInit } from '@angular/core';
import { MatchingService } from '../matching.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import * as globals from '../../globals';

@Component({
  selector: 'app-match-edit',
  templateUrl: './match-edit.component.html',
  styleUrls: ['./match-edit.component.css'],
})
export class MatchEditComponent implements OnInit {

  object;
  matchForm: FormGroup;
  selectedText = '';
  isOnlyOne = true;
  pics;
  pic_path = globals.pic_path;
  folder_path = '';
  isCollapse = true;

  constructor(private matchingService: MatchingService,
              private router: Router,
  ) { }

  ngOnInit() {
    this.object = this.matchingService.getDataObject();
    this.folder_path = this.object.folder;
    this.newForm();
    this.matchingService.getPics(this.folder_path).then(
      (data) => {
        this.pics = data;
      }
    );
  }

  newForm() {
    this.matchForm = new FormGroup({
      'keyword': new FormArray([]),
    });

    if (this.object.key.length > 0) {
      this.object.key.forEach(key => {
        const control = new FormControl(key, Validators.required);
        (<FormArray>this.matchForm.get('keyword')).push(control);
      });
    } else {
      const control = new FormControl(null, Validators.required);
      (<FormArray>this.matchForm.get('keyword')).push(control);
    }
  }

  onAddKeyword() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.matchForm.get('keyword')).push(control);
  }

  onRmKeyword(number) {
    (<FormArray>this.matchForm.get('keyword')).removeAt(number);
  }

  get formKeyword(): FormGroup {
    return this.matchForm.get('keyword') as FormGroup;
  }

  submitForm() {
    const sendObj: {id: number, keyword: string[]} = {
      id: this.object.id,
      keyword: this.matchForm.value.keyword,
    };
    this.matchingService.sendObject(sendObj).then(
      () => {
        this.router.navigate(['match']);
      }
    );
  }

  selectTextToValue() {
    let text = '';
    if (window.getSelection()) {
      text = window.getSelection().toString();
    }
    this.selectedText = text.trim();
    if (this.selectedText !== '') {
      if (!this.isOnlyOne) {
        const control = new FormControl(this.selectedText, Validators.required);
        (<FormArray>this.matchForm.get('keyword')).push(control);
      } else {
        (<FormArray>this.matchForm.get('keyword')).get('0').setValue(this.selectedText);
        this.isOnlyOne = false;
      }
    }
  }
}
