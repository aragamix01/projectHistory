import { Component, OnInit } from '@angular/core';
import { ContentService } from './content.service';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [ContentService]
})
export class ContentComponent implements OnInit {

  searchWord = '';
  constructor(private ctService: ContentService,
              private appService: AppService,
              private router: Router) { }

  TrueTableData = [];
  tableData = [];
  libraryWord = [];

  ngOnInit() {}

  onSearch(search) {
    this.appService.search(search).then(
      () => {
        this.router.navigate(['result']);
      }
    );
  }
}
