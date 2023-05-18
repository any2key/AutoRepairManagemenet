import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent {
  title = 'app';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  constructor(private router: Router, private ui: UiService) {

  }

  route(path: string) {
    this.router.navigate([path]);
  }
}
