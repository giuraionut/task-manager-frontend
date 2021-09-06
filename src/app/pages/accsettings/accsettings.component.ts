import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-accsettings',
  templateUrl: './accsettings.component.html',
  styleUrls: ['./accsettings.component.scss'],
})
export class AccsettingsComponent implements OnInit {
  constructor() {}

  eventsSubject: Subject<void> = new Subject<void>();
  ngOnInit(): void {}

  public updateProfile() {
    this.eventsSubject.next();
  }
}
