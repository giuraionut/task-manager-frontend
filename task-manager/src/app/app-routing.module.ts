import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainpageComponent } from './mainpage/mainpage.component'
import { AccsettingsComponent } from './accsettings/accsettings.component';
const routes: Routes = [
  { path: "taskmanager/home", component: HomeComponent },
  { path: "taskmanager/mainpage", component: MainpageComponent },
  { path: "taskmanager/settings", component: AccsettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
