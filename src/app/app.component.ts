import { Component, enableProdMode } from '@angular/core';
import { AuthService } from "./auth.service";
import { environment } from 'src/environments/environment';
import { GlobalVariables } from './common/global-variable';
enableProdMode();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'yes-frontend';

  url = environment.url + "admin/"

  constructor(private authService: AuthService,) { }


  logout() {
    this.authService.logout()
    location.assign(environment.frontend_url + "home/")

  }

  backupData() {
    this.authService.backupData()
    console.log("Database backup sucessfull...");

  }
}
