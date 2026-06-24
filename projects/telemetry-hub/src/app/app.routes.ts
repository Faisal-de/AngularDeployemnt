import { Routes } from '@angular/router';
import { ExplorerView } from './features/explorer/explorer.view';
import { InsightsView } from './features/insights/insights.view';

export const routes: Routes = [
  // 1. If the user hits the root URL, send them straight to the Explorer view
  { path: '', redirectTo: 'explorer', pathMatch: 'full' },
  
  // 2. Define our explicit page paths
  { path: 'explorer', component: ExplorerView },
  { path: 'insights', component: InsightsView }
];
