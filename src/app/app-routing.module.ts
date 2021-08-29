import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { AccsettingsComponent } from './pages/accsettings/accsettings.component';
import { ChatComponent } from './items/chat/chat.component';
import { TeammanagementComponent } from './pages/teammanagement/teammanagement.component';
const routes: Routes = [
  { path: 'taskmanager/home', component: HomeComponent },
  { path: 'taskmanager/mainpage', component: MainpageComponent },
  { path: 'taskmanager/settings', component: AccsettingsComponent },
  { path: 'taskmanager/chat', component: ChatComponent },
  { path: 'taskmanager/teammanagement', component: TeammanagementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
