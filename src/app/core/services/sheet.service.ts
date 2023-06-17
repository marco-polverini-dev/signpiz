import { Injectable } from '@angular/core';
import { Sign } from 'src/app/feature/sign/sign.model';
import { parse } from '../utils/json.utils';
import { getTodayUnix } from '../utils/date.utils';

@Injectable({
  providedIn: 'root',
})
export class SheetService {
  private SHEET: string = 'SHEET';

  constructor() {}

  get(): Map<number, Sign> {
    let sheet = localStorage.getItem(this.SHEET);
    return sheet
      ? new Map<number, Sign>(parse(sheet))
      : new Map<number, Sign>();
  }

  save(sheet: Map<number, Sign>): Sign | undefined {
    localStorage.setItem(
      this.SHEET,
      JSON.stringify(Array.from(sheet.entries()))
    );
    return sheet.get(getTodayUnix());
  }

  saveFromImport(sheet: string): void {
    localStorage.setItem(this.SHEET, sheet);
  }
}
