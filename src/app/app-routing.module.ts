import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { AccsettingsComponent } from './pages/accsettings/accsettings.component';
import { ChatComponent } from './items/chat/chat.component';
import { TeammanagementComponent } from './pages/teammanagement/teammanagement.component';
import { Guard } from './services/guard.service';
const routes: Routes = [
  { path: 'taskmanager/home', component: HomeComponent },
  {
    path: 'taskmanager/mainpage',
    component: MainpageComponent,
    canActivate: [Guard],
  },
  {
    path: 'taskmanager/settings',
    component: AccsettingsComponent,
    canActivate: [Guard],
  },
  { path: 'taskmanager/chat', component: ChatComponent, canActivate: [Guard] },
  {
    path: 'taskmanager/teammanagement',
    component: TeammanagementComponent,
    canActivate: [Guard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
