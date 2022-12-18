import { Component } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { emailValidator } from 'src/app/shared/validators';
import { sameValueGroupValidator } from 'src/app/shared/validators/same-value-group-validator';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  form = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(5)]],
    lastName: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, emailValidator(['bg', 'com'])]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    pass: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(5)]],
      rePassword: ['', [Validators.required, Validators.minLength(5)]]
    }, {
      validators: [sameValueGroupValidator('password', 'rePassword')]
    })
  });


  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService) {

    }

  registerHandler(): void {

      if (this.form.invalid) {
        return;
      }

      this.authService.user = {
        firstName: 'Mariela',
        lastName: "Mircheva",
        email: "m.mircheva02@gmail.com",
        phone: "0888123456",
      } as any;

      const returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';

      this.router.navigate([returnUrl]);

      //const { firstName, lastName, email, phone, password, rePassword } = this.form.value;
      // this.authService.register(firstName!, lastName!, email!, phone!, password!, rePassword!)
      //   .subscribe(res => console.log(res));


    }


  }
