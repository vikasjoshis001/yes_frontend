import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  token;
  msg;
  errorMessage;
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  // Login Api Call
  login(data) {
    this.authService.login(data.value).subscribe((result) => {
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
    },
      (error) => {
        this.errorMessage = error;
        console.log(this.errorMessage)
        alert("Network Error")
      })
  }

  ngOnInit(): void {
  }

}
