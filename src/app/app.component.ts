import {Component} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import {formatDate} from '@angular/common';


@Component({
             selector: 'app-root',
             templateUrl: './app.component.html',
             styleUrls: ['./app.component.css']
           })
export class AppComponent {

  courses$;
  course$;
  uploadImages: string[] = [];
  basePath = '/uploads';
  file: File;


  // todos$: AngularFireList<any[]>;
  today = new Date();


  // add(value){

  //   const cour=this.db.list("/coures");
  //   cour.push(value);
  // }
  jstoday = '';


  constructor(private db: AngularFireDatabase) {
    this.courses$ = db.list(this.basePath).valueChanges();
    console.log(this.courses$);
  }


  progress(event) {
    console.log('IN');
    const storageRef = firebase.storage().ref();
    console.log('jshkj');
    this.file = event.target.files[0];
    const randomId = Math.random().toString(36).substring(2);

    const uploadTask = storageRef.child(`${this.basePath}/${randomId}`).put(this.file);



    console.log('jshkj');
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
                      this.uploadImages.push(downloadURL);
                    });
                  });

  }


  create() {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');

    console.log(this.jstoday);
  }
}
