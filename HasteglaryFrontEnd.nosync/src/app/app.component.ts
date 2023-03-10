import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Book } from './book';
import { BookService } from './book.service';
import { NgForm } from '@angular/forms';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private bookService: BookService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // send request to /books/get-all with the username and the password in the authorization
  public onLogin(loginForm: NgForm) {
    console.log('Logging in with: ', loginForm.value);

    // localhost:8080/login gives 302 even if login is right because i need to set
    // a default success action, which i don't have time to do now so i will just check
    // if this credentials allow me to fetch the books, which means that the user is right

    this.bookService.getAllBooks(loginForm.value).subscribe({
      next: (response: Book[]) => {
        localStorage.setItem('user', JSON.stringify(loginForm.value));
        this.router.navigate(['/home']);
      },
    });
  }

  public onRegistration(registrationForm: NgForm): void {
    console.log(registrationForm.value);
    this.userService.registerUser(registrationForm.value).subscribe({
      next: (response: any) => {
        console.log(response);
      },
    });
    // clear values in registration form
    registrationForm.reset();
  }
}
