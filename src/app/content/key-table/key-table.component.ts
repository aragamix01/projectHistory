import { Component, OnInit } from '@angular/core';
import { ContentService } from '../content.service';
import { Http, Response } from '@angular/http';
import { KeyTableService } from './key-table.service';
import { MatDialog } from '@angular/material';
import { ManageKeyTableComponent } from './manage-key-table/manage-key-table.component';

@Component({
  selector: 'app-key-table',
  templateUrl: './key-table.component.html',
  styleUrls: ['./key-table.component.css'],
  providers: [ContentService],
})
export class KeyTableComponent implements OnInit {

  tableData = [];
  closeResult: string;

  constructor(private ctService: ContentService,
              private kTService: KeyTableService,
              private http: Http,
              public dialog: MatDialog,
            ) { }

  ngOnInit() {
    this.ctService.getTable().then(
      (data) => {
        this.tableData = data;
        console.log(data);
      }
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(ManageKeyTableComponent, {
      height: '600px',
      width: '80%',
    });
  }

  openEdit(id: number) {
    this.kTService.setValueToEdit(id, this.tableData);
    const dialogRef = this.dialog.open(ManageKeyTableComponent, {
      height: '600px',
      width: '80%',
    });
  }

  onDelete(number: number) {
    console.log(this.tableData[number].id);
    this.kTService.onDelete(this.tableData[number].id);
    this.tableData.splice(number, 1);
    this.refresh();
  }

  refresh(): void {
    window.location.reload();
  }
}

