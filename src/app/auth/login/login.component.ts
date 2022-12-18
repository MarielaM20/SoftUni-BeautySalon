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

    this.authService.user = {
      username: 'Mariela',
      email: "m.mircheva02@gmail.com"
    } as any;

    const returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';

    this.router.navigate([returnUrl]);

    //const { firstName, lastName, email, phone, password, rePassword } = this.form.value;
    // this.authService.register(firstName!, lastName!, email!, phone!, password!, rePassword!)
    //   .subscribe(res => console.log(res));
  }

}
