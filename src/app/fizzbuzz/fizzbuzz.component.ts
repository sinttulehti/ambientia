import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fizzbuzz',
  templateUrl: './fizzbuzz.component.html',
  styleUrls: ['./fizzbuzz.component.scss'],
})
export class FizzbuzzComponent implements OnInit {
  fizzbuzzResults: String = '';
  constructor() {}

  ngOnInit(): void {
    for (let i = 1; i <= 100; i++) {
      let result = '';
      if (i % 3 === 0 || i.toString().indexOf('3') > -1) {
        result += 'fizz';
      }
      if (i % 5 === 0 || i.toString().indexOf('5') > -1) {
        result += 'buzz';
      }
      if (!result) {
        result += i;
      }
      this.fizzbuzzResults += result + '<br>';
    }
  }
}
