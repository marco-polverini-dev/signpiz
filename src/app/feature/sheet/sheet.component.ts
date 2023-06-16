import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sign, SHEET } from '../sign/sign.model';
import { parse } from 'src/app/core/utils/json.utils';
import {
  getDate,
  getHours,
  getUnix,
  isBetween,
} from 'src/app/core/utils/date.utils';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sheet',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss'],
})
export class SheetComponent {
  SHEET: Map<number, Sign>;
  formBuilder: FormBuilder = inject(FormBuilder);
  form: FormGroup;

  constructor() {
    this.SHEET = this.getSheet();
    this.form = this.formBuilder.group({
      from: this.formBuilder.control(null, [Validators.required]),
      to: this.formBuilder.control(null, [Validators.required]),
    });
  }

  getSheet(): Map<number, Sign> {
    let sheet = localStorage.getItem(SHEET);
    return sheet
      ? new Map<number, Sign>(parse(sheet))
      : new Map<number, Sign>();
  }

  getHours(unix?: number): string {
    return getHours(unix);
  }

  getDate(unix?: number): string {
    return getDate(unix);
  }

  find() {
    const sheet = this.getSheet();
    let sheetFiltered: Map<number, Sign> = new Map<number, Sign>();
    const form = this.form.value;
    const from = getUnix(form.from);
    const to = getUnix(form.to);
    Array.from(sheet.keys()).forEach((key) => {
      if (isBetween(key, from, to)) {
        const day = sheet.get(key);
        if (day) sheetFiltered.set(key, day);
      }
    });
    this.SHEET = sheetFiltered;
  }
}
