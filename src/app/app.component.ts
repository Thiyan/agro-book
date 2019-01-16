import { Component, OnInit, OnDestroy } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import {formatDate } from '@angular/common';

import {Observable, from, Subscription} from 'rxjs';
import { defineBase } from '@angular/core/src/render3';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  // courses$;
  // course$;
  basePath='/uploads';
  file:File;
  // todos$: AngularFireList<any[]>;

  constructor(private db:AngularFireDatabase){
    // this.courses$=db.list("/coures").valueChanges(); 
    
  }
  
  // add(value){

  //   const cour=this.db.list("/coures");
  //   cour.push(value);
  // }

  progress(event){
    console.log("IN");
    const storageRef = firebase.storage().ref();
    console.log("jshkj");
    this.file=event.target.files[0];
    const randomId = Math.random().toString(36).substring(2);

    const uploadTask = storageRef.child(`${this.basePath}/${randomId}`).put(this.file);

 

    console.log("jshkj");
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL);
        });
      });
    
    }

    today= new Date();
    jstoday = '';
   
    create(){
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
  
    console.log(this.jstoday);
    }
  }
