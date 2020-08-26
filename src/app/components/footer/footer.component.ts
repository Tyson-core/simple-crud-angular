import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  date: number;
  constructor() {
    this.date = new Date().getFullYear();
  }

  ngOnInit(): void {}
}
