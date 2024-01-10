import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:any
  userSub= new Subject()
  confirmationResult:any

  constructor(public fireAuth: AngularFireAuth, private router:Router) {
    this.fireAuth.onAuthStateChanged(
      (user)=>{
        this.userSub.next(user)
      }
    )
   }

   logout(){
    this.fireAuth.signOut().then(
      ()=>this.router.navigate(['/sign-in'])
    )
   }

   signInWithPhoneNumber(phoneNumber:any, applicationVerifier:any){
      return new Promise<any>(
        (resolve, reject)=>{
          this.fireAuth.signInWithPhoneNumber(phoneNumber,applicationVerifier).then(
            (res:any)=>{
              this.confirmationResult=res
              resolve(res)
            })
          .catch(
            (error)=>{
              console.log("SMS not send", error)
              reject("SMS not send")
            })         
      }) 
}

enterVerificartionCode(code:any){
    return this.confirmationResult.confirm(code)
}

}
