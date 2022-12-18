import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { emailValidator } from 'src/app/shared/validators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  makeAnAppointmentHandler(formAppointment: FormGroup): void {
    if (this.formAppointment.invalid) {
      return;
    }

    const { firstName, lastName, email, phone } = this.formData.value;

    this.authService.user = {
      firstName, lastName, email, phone
    } as any;

    this.router.navigate(['/views/appointmentMessage']);
  }

  formAppointment = this.fb.group({
    date: ['', [Validators.required]],
    hour: ['', [Validators.required]],
    service: ['', [Validators.required]],
    email: ['', [Validators.required, emailValidator(['bg', 'com'])]]
  })

  showEditMode = false;

  get user() {
    const { firstName, lastName, email, phone } = this.authService.user!;
    return {
      firstName,
      lastName,
      email,
      phone
    };
  }

  formData = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, emailValidator(['bg', 'com'])]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
  })

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.formData.setValue(this.user);
  }
  toggleEditMode(): void {
    this.showEditMode = !this.showEditMode;
  }

  saveProfile(): void {
    if (this.formData.invalid) {
      return;
    }

    const { firstName, lastName, email, phone } = this.formData.value;

    this.authService.user = {
      firstName, lastName, email, phone
    } as any;

    this.toggleEditMode();
  }

}
