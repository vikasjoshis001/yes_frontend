import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { AuthService } from "../auth.service";
import { GlobalVariables } from '../common/global-variable';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  token;
  msg;
  show = GlobalVariables.show_model;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  login(data) {
    console.log("Logging in...")
    return this.authService.login(data.value).subscribe((result) => {
      console.log("Successfully Logged in....");
      this.token = result;
      if (this.token.msg == "Invalid Credentials") {
        this.msg = "**Invalid Username or Password";
      }
      else {
        this.token = this.token.data['token']
        sessionStorage.setItem('token', this.token);
        this.router.navigate(['/business']);
      }
    })
  }

  onClose() {
    GlobalVariables.show_model = false;
    this.show = GlobalVariables.show_model;

  }



  ngOnInit(): void {
  }

}
