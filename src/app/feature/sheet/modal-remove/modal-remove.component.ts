import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import { Sign } from '../../sign/sign.model';
import { SheetService } from 'src/app/core/services/sheet.service';
import { getDate } from 'src/app/core/utils/date.utils';

@Component({
  selector: 'app-modal-remove',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-remove.component.html',
  styleUrls: ['./modal-remove.component.scss'],
})
export class ModalRemoveComponent {
  @Input()
  entry!: KeyValue<number, Sign>;
  sheetService: SheetService;
  @Output('reload') reload: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.sheetService = inject(SheetService);
  }

  delete() {
    let sheet = this.sheetService.get();
    sheet.delete(this.entry.key);
    this.sheetService.save(sheet);
    this.reload.emit();
  }

  getDate(unix?: number): string {
    return getDate(unix);
  }
}
