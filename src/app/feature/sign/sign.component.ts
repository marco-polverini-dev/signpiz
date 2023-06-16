import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getHours, getTodayUnix } from 'src/app/core/utils/date.utils';
import * as moment from 'moment';
import { parse } from 'src/app/core/utils/json.utils';
import { SHEET, Sign } from './sign.model';

@Component({
  selector: 'app-sign',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent {
  today?: Sign;

  constructor() {
    this.today = this.getToday();
  }

  entrance() {
    const todayUnix = getTodayUnix();
    let sheet = this.getSheet();
    !sheet?.has(todayUnix) &&
      sheet?.set(todayUnix, { entrance: moment().valueOf() });
    this.saveSheet(sheet);
  }

  exit() {
    const todayUnix = getTodayUnix();
    let sheet = this.getSheet();
    const entrance = sheet.get(todayUnix)?.entrance;
    const exit = sheet.get(todayUnix)?.exit;
    if (entrance && !exit) {
      sheet?.set(todayUnix, {
        entrance: entrance,
        exit: moment().valueOf(),
      });
      this.saveSheet(sheet);
    }
  }

  getSheet(): Map<number, Sign> {
    let sheet = localStorage.getItem(SHEET);
    return sheet
      ? new Map<number, Sign>(parse(sheet))
      : new Map<number, Sign>();
  }

  getToday() {
    return this.getSheet().get(getTodayUnix());
  }

  saveSheet(sheet: Map<number, Sign>) {
    localStorage.setItem(SHEET, JSON.stringify(Array.from(sheet.entries())));
    this.today = sheet.get(getTodayUnix());
  }

  getHours(unix: number): string {
    return getHours(unix);
  }
}
