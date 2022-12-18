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

    const { username, email } = this.formData.value;

    this.authService.user = {
      username, email
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
    const { username, email} = this.authService.user!;
    return {
      username,
      email
    };
  }

  formData = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, emailValidator(['bg', 'com'])]],
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

    const { username, email } = this.formData.value;

    this.authService.user = {
      username, email
    } as any;

    this.toggleEditMode();
  }

}
