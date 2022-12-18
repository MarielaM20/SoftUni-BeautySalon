import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { emailValidator } from 'src/app/shared/validators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form = this.fb.group({
    email: ['', [Validators.required, emailValidator(['bg', 'com'])]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService) {
  }

  loginHandler(): void {

    if (this.form.invalid) {
      return;
    }

    this.form.value.email='m.mircheva02@gmail.com';
    this.form.value.password='123456';

    this.authService.user = {
      firstName: 'Mariela',
      lastName: "Mircheva",
      email: "m.mircheva02@gmail.com",
      phone: "0888123456",
    } as any;

    this.authService.login(this.form.value.email.trim(), this.form.value.password);
    this.form.value.email = '';
    this.form.value.password = '';

    const returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';

    this.router.navigate([returnUrl]);

    const { email, password } = this.form.value;

    // this.authService.login(email!, password!)
    //   .subscribe(res => console.log(res));
  }

}
