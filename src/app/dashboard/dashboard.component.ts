import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private route: Router) { }

  dashboard = [
    {
      cardStyle: 'card card-inverse card-primary mb-3',
      desc: 'จำนวนวัตถุจัดแสดง',
      val: 152,
      image: 'vase2',
      path: '/match',
    },
    {
      cardStyle: 'card card-inverse card-success mb-3',
      desc: 'จำนวนวัตถุจัดแสดงที่จับคู่',
      val: 78,
      image: 'ouroboros',
      path: '/match',
    },
    {
      cardStyle: 'card card-inverse card-info mb-3',
      desc: 'จำนวนคีย์เวิร์ดที่ถูกจับคู่',
      val: 78,
      image: 'keyword',
      path: '/keytable',
    },
    {
      cardStyle: 'card card-inverse card-danger mb-3',
      desc: 'ความพึงพอใจจากการค้นหา',
      val: 78,
      image: 'like',
      path: '/search',
    }
  ];

  ngOnInit() {
  }

  navigate(path) {
    this.route.navigate([path]);
  }

}
