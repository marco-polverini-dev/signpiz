import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss'],
})
export class ThemeSelectorComponent implements OnInit {
  theme = signal<string>('dark');

  ngOnInit(): void {
    let theme = localStorage.getItem('THEME');
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    this.theme.set(theme);
    localStorage.setItem('THEME', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
  }

  async toggleTheme() {
    this.theme.set(this.theme() === 'dark' ? 'light' : 'dark');
    localStorage.setItem('THEME', this.theme());
    document.documentElement.setAttribute('data-bs-theme', this.theme());
  }
}
