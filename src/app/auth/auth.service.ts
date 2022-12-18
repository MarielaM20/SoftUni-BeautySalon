import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../shared/interfaces';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  get isLoggedIn() {
    return this.user !== null;
  }
  //user: IUser | null = null;

  user: IUser | null = {
    firstName: "Mariela",
    lastName: "Mircheva",
    email: "m.mircheva02@gmail.com",
    phone: "0888123456"
  }
  constructor(private fireauth: AngularFireAuth, private router: Router) { }


  login(email: string, password: string) {



    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {

      localStorage.setItem('token', 'true');
      this.router.navigate(['/']);

    }, err => {
      alert(err.message);
      this.router.navigate(['/auth/login']);
    })

  }


  register() {
    this.fireauth.createUserWithEmailAndPassword
  }


  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    }, err => {
      alert(err.message);
    })
  }

  // register(firstName: string, lastName: string, email: string, phone: string, password: string, rePassword: string) {
  //   return this.http.post<any>('/api/register', { firstName, lastName, email, phone, password, rePassword });
  // }

  // login(email: string, password: string) {
  //   return this.http.post<any>('/api/login', {email, password });
  // }
}
