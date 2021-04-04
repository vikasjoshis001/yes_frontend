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
  database;
  show_backup = false;
  errorMessage;
  constructor(private authService: AuthService,) { }


  // logout function
  logout() {
    this.authService.logout()
    location.assign(environment.frontend_url + "home/")

  }

  // backup Api Called
  backupData() {
    this.show_backup = true
    this.authService.backupData().subscribe((result) => {
      this.database = result;
      console.log("Database backup sucessfull...");
      this.show_backup = false;
      location.assign(environment.frontend_url + "/")
    },
    (error) => {
      this.show_backup = false;
      this.errorMessage = error;
      console.log(this.errorMessage)
      alert("Network Error")
    })
  }
}
