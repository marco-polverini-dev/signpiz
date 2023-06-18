import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import { Sign } from '../../sign/sign.model';
import { getDate, getHours, getUnixDate } from 'src/app/core/utils/date.utils';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SheetService } from 'src/app/core/services/sheet.service';

@Component({
  selector: 'app-modal-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss'],
})
export class ModalEditComponent implements OnInit {
  @Input()
  entry!: KeyValue<number, Sign>;
  form: FormGroup;
  formBuilder: FormBuilder;
  sheetService: SheetService;
  @Output('reload') reload: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.formBuilder = inject(FormBuilder);
    this.sheetService = inject(SheetService);
    this.form = this.formBuilder.group({});
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      from: this.formBuilder.control(getHours(this.entry.value.entrance), [
        Validators.required,
      ]),
      to: this.formBuilder.control(
        getHours(this.entry.value.exit),
        Validators.required
      ),
    });
  }

  save() {
    const entrance = getUnixDate(this.entry.key, this.form.value.from);
    const exit = getUnixDate(this.entry.key, this.form.value.to);
    let sheet = this.sheetService.get();
    sheet.set(this.entry.key, { entrance: entrance, exit: exit });
    this.sheetService.save(sheet);
    this.reload.emit();
  }

  getHours(unix?: number): string {
    return getHours(unix);
  }

  getDate(unix?: number): string {
    return getDate(unix);
  }
}
