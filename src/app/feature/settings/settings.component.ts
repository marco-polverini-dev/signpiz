import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSelectorComponent } from 'src/app/core/theme-selector/theme-selector.component';
import { SheetService } from 'src/app/core/services/sheet.service';
import { getTodayUnix } from 'src/app/core/utils/date.utils';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ThemeSelectorComponent],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  imported: boolean;
  sheetService: SheetService;

  constructor() {
    this.imported = false;
    this.sheetService = inject(SheetService);
  }

  downloadBackup() {
    const json = JSON.stringify(Array.from(this.sheetService.get().entries()));
    var element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/json;charset=UTF-8,' + encodeURIComponent(json)
    );
    element.setAttribute(
      'download',
      'backup_timbrature_' + getTodayUnix() + '.json'
    );
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
    document.body.removeChild(element);
  }

  async importBackup(event: any) {
    const sheet = await event.target.files[0].text();
    console.log(sheet);
    this.imported = true;
    setTimeout(() => {
      this.imported = false;
    }, 5000);
    event.target.value = '';
    this.sheetService.saveFromImport(sheet);
  }
}
