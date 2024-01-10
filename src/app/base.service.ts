import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  chat: AngularFireList<any>

  constructor(private db: AngularFireDatabase) { 
    this.chat=this.db.list('/chat')
  }

  getMessages(){
    return this.chat
  }

  addMessage(body:any){
    this.chat.push(body)
  }
  uploadMessage(body:any){
    let key=body.key
    delete body.key
    this.chat.update(key,body)
  }

  deleteMessage(body:any){
    this.chat.remove(body.key)
  }
}

