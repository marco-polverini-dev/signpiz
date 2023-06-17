import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sign } from '../sign/sign.model';
import {
  getDate,
  getHours,
  getTodayUnix,
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
import { SheetService } from 'src/app/core/services/sheet.service';

@Component({
  selector: 'app-sheet',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.scss'],
})
export class SheetComponent {
  SHEET: Map<number, Sign>;
  formBuilder: FormBuilder;
  sheetService: SheetService;
  form: FormGroup;
  currentPage: number = 1;
  pageSize: number = 10;
  pages: number = 0;
  searched: boolean = false;
  today: number;

  constructor() {
    this.formBuilder = inject(FormBuilder);
    this.sheetService = inject(SheetService);
    this.SHEET = this.getSheet();
    this.calculatePages();
    this.form = this.formBuilder.group({
      from: this.formBuilder.control(null, [Validators.required]),
      to: this.formBuilder.control(null, [Validators.required]),
    });
    this.today = getTodayUnix();
  }

  getSheet(): Map<number, Sign> {
    return this.sheetService.get();
  }

  getHours(unix?: number): string {
    return getHours(unix);
  }

  getDate(unix?: number): string {
    return getDate(unix);
  }

  find() {
    this.searched = true;
    this.currentPage = 1;
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
    this.calculatePages();
  }

  removeSearch() {
    this.searched = false;
    this.form.reset();
    this.currentPage = 1;
    this.SHEET = this.getSheet();
    this.calculatePages();
  }

  nextPage() {
    if (this.currentPage < this.pageSize) this.currentPage++;
  }
  previousPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  calculatePages() {
    const entries = Array.from(this.SHEET.entries());
    this.pages = Math.ceil(entries.length / this.pageSize);
  }
}
