import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ DashboardService ]
})
export class DashboardComponent implements OnInit {

  constructor(private route: Router,
              private dashboardService: DashboardService,
              private appService: AppService,
              private router: Router) {}

  dashboard = [
    {
      cardStyle: 'card card-inverse card-primary mb-3',
      desc: 'จำนวนวัตถุจัดแสดง',
      val: 0,
      image: 'vase2',
      path: '/match',
    },
    {
      cardStyle: 'card card-inverse card-success mb-3',
      desc: 'จำนวนวัตถุจัดแสดงที่จับคู่',
      val: 0,
      image: 'ouroboros',
      path: '/match',
    },
    {
      cardStyle: 'card card-inverse card-info mb-3',
      desc: 'จำนวนคีย์เวิร์ดที่ถูกจับคู่',
      val: 0,
      image: 'keyword',
      path: '/keytable',
    },
    {
      cardStyle: 'card card-inverse card-danger mb-3',
      desc: 'ความพึงพอใจจากการค้นหา',
      val: 0,
      image: 'like',
      path: '/search',
    }
  ];

  data: any;
  recentSearch = [];

  ngOnInit() {
    this.dashboardService.getStatisticDetails().then(
      (data) => {
        this.data = {
          labels: data.searchWord,
          datasets: [
            {
              label: 'ใช้เวลาในการค้นหา',
              data: data.timeTaken,
              fill: false,
              backgroundColor: '#4bc0c0',
              borderColor: '#4bc0c0',
            },
            {
              label: 'จำนวนวัตถุที่พบ',
              data: data.foundObject,
              fill: false,
              backgroundColor: '#565656',
              borderColor: '#565656',
            }
          ]
        };

        const lengthOfWord = data.searchWord.length;
        for (let index = lengthOfWord - 1; index > lengthOfWord - 6; index--) {
          this.recentSearch.push(data.searchWord[index]);
        }
      }
    );
    this.dashboardService.getStatistics().then(
      (data) => {
        this.dashboard[0].val = data.CountMuseObject;
        this.dashboard[1].val = data.CountMatchObject;
        this.dashboard[2].val = data.CountMatchKeyword;
        this.dashboard[3].val = data.CountLove;
      }
    );
  }

  navigate(path) {
    this.route.navigate([path]);
  }

  async onSearch(search) {
    await this.appService.onSearch(this.appService.splitWord(search));
    this.router.navigate(['result']);
  }

}
