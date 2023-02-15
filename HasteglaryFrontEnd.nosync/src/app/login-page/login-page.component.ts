import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../book';
import { BookService } from '../book.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
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
      error: (error: HttpErrorResponse) => {
        // i don't understnad how this can happen
        if (error.status === 200) {
          localStorage.setItem('user', JSON.stringify(loginForm.value));
          this.router.navigate(['/home']);
        }
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
