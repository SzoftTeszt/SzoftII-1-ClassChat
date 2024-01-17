import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RecaptchaVerifier, getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage  {
  phoneNo:any=""
  countryCode="+36"
  recaptchaVerifier!:RecaptchaVerifier
  recaptcha=true
  code:any
  smsSend=false;
  dialCode:any
  constructor(private auth:AuthService, private router:Router, private alertController:AlertController) { }



  ionViewDidEnter(){
    this.dialCode=environment.counryCode
    this.smsSend=false;
    const auth = getAuth();
    auth.languageCode='hu';
    console.log(auth)
    if (!this.recaptchaVerifier) this.recaptchaVerifier= new RecaptchaVerifier(auth,'recaptcha-container',    {
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
    //this.phoneNo="+36303236954"
    this.auth.signInWithPhoneNumber(this.countryCode+this.phoneNo, this.recaptchaVerifier).then(
      ()=>{
        console.log("SMS elküldve!!!")
        //this.smsSend=true;
        this.codeVerificationAlert()
      }).catch(
        (err)=>console.log("Hiba van", err)
      )
  }


  codeVeification(){
    this.auth.enterVerificartionCode(this.code)
    .then(
      (u:any)=>{
        console.log("User",u)
        this.router.navigate(['/home'])
      }
    )
  }

  async codeVerificationAlert(){
    const alert= await this.alertController.create(
      {
        header:"Enter Verification Code",
        backdropDismiss:false,
        inputs:[
          {
            name:'code',
            type:'text',
            placeholder:'Enter your code'
          }
        ],
        buttons:[
          {
            text:'Enter',
            handler: (res)=>{
              this.code=res.code
              this.codeVeification()
            }
          }
        ]
      }
    )
    await alert.present()   

  }
}
