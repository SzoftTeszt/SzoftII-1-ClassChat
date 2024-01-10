import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RecaptchaVerifier, getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage  {
  phoneNo:any
  countryCode="+36"
  recaptchaVerifier!:RecaptchaVerifier
  recaptcha=true


  constructor(private auth:AuthService, private router:Router, private alertController:AlertController) { }



  ionViewDidEnter(){
    const auth = getAuth();
    console.log(auth)
    this.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container',    {
      'size': 'invisible',
      'callback': (response:any) => {
        this.recaptcha=true       
        console.log("invisible response")
      },
      'expired-callback': () => {
        this.recaptcha=false
        console.log("invisible Hiba")
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      }
    });
    }


  signInWithPhoneNumber(){
    this.phoneNo="+36303236954"
    this.auth.signInWithPhoneNumber(this.phoneNo, this.recaptchaVerifier).then(
      ()=>{
        console.log("SMS elküldve!!!")
      }).catch(
        (err)=>console.log("Hiba van", err)
      )
  }
}
