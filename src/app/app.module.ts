import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from './services/auth.service';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { MainpageComponent } from './pages/mainpage/mainpage.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileComponent } from './pages/profile/profile.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TeamComponent } from './pages/team/team.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { AccsettingsComponent } from './pages/accsettings/accsettings.component';
import { UpdateuserinfoComponent } from './pages/updateuserinfo/updateuserinfo.component';
import {
  MatNativeDateModule,
  MatOptionModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ChatComponent } from './chat/chat.component';
import { TaskitemComponent } from './items/taskitem/taskitem.component';
import { MemberitemComponent } from './items/memberitem/memberitem.component';
import { TaskprogressbarComponent } from './items/taskprogressbar/taskprogressbar.component';
import { TeammanagementComponent } from './teammanagement/teammanagement.component';
import { Interceptor } from './services/interceptor.service';
import { NotificationitemComponent } from './items/notificationitem/notificationitem.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './items/dialog/dialog.component';
import { NewtaskComponent } from './items/newtask/newtask.component';
import { InvitationComponent } from './items/invitation/invitation.component';
import { NewteamComponent } from './items/newteam/newteam.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadimgComponent } from './items/uploadimg/uploadimg.component';
import { ImageCropperModule } from 'ngx-image-cropper';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainpageComponent,
    NavigationComponent,
    ProfileComponent,
    TasksComponent,
    TeamComponent,
    AccsettingsComponent,
    UpdateuserinfoComponent,
    ChatComponent,
    TaskitemComponent,
    MemberitemComponent,
    TaskprogressbarComponent,
    TeammanagementComponent,
    NotificationitemComponent,
    DialogComponent,
    NewtaskComponent,
    InvitationComponent,
    NewteamComponent,
    UploadimgComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    FlexLayoutModule,
    MatProgressBarModule,
    MatDividerModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    AppRoutingModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule
  ],
  providers: [
    AuthService,
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    MatNativeDateModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
