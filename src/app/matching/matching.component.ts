import { Component, OnInit } from '@angular/core';
import { MatchingService } from './matching.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.css'],
})
export class MatchingComponent implements OnInit {

  listOfObjects = [];

  constructor(private matchingService: MatchingService,
              private route: Router,
  ) { }

  ngOnInit() {
    this.matchingService.getObject().then(
      (data) => {
        this.listOfObjects = data;
      }
    );
  }

  onRowSelect(event) {
    this.matchingService.setDataObject(event.data);
    this.route.navigate(['match/edit']);
  }
}
