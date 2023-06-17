import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getHours, getTodayUnix } from 'src/app/core/utils/date.utils';
import * as moment from 'moment';
import { parse } from 'src/app/core/utils/json.utils';
import { SHEET, Sign } from './sign.model';
import { SheetService } from 'src/app/core/services/sheet.service';

@Component({
  selector: 'app-sign',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent {
  today?: Sign;
  sheetService: SheetService;

  constructor() {
    this.sheetService = inject(SheetService);
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
    return this.sheetService.get();
  }

  getToday() {
    return this.getSheet().get(getTodayUnix());
  }

  saveSheet(sheet: Map<number, Sign>) {
    this.today = this.sheetService.save(sheet);
  }

  getHours(unix: number): string {
    return getHours(unix);
  }
}
