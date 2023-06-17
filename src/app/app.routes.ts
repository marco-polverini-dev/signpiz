import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'sign',
    loadComponent: () =>
      import('./feature/sign/sign.component').then((c) => c.SignComponent),
  },
  {
    path: 'sheet',
    loadComponent: () =>
      import('./feature/sheet/sheet.component').then((c) => c.SheetComponent),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./feature/settings/settings.component').then(
        (c) => c.SettingsComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/sign',
  },
];
