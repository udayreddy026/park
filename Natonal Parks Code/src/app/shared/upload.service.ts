import { Injectable } from '@angular/core';
import {  AngularFireDatabase , AngularFireList } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { Upload } from './upload';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor( private af : AngularFireModule , private db : AngularFireDatabase ) { }

   private basePath : string ;
  uploads : AngularFireList<Upload[]>; 

  pushUpload( upload : Upload , basePath : string)
  {
    let storageRef  = firebase.storage().ref();
    let uploadTask = storageRef.child(basePath + '/' + upload.file.name).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED , 
      (snapshot) =>
      {
        upload.progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100 )
      } , 
      (error) => {
        console.log(error);
      } ,
      () =>
      {
        let uploadURL = "";
        uploadTask.snapshot.ref.getDownloadURL()
        .then( downloadURL =>{
          console.log(downloadURL);
          upload.url =  downloadURL;
        upload.name = upload.file.name;
        this.saveFileUpload(upload , basePath)
        })
      }
      );
  }
    private saveFileUpload(upload : Upload , basePath : string){
      this.db.list(basePath).push(upload);
    }
    deleteUpload( upload : Upload)
    {
      this.deleteFileData(upload.$key)
      .then( () => {
        this.deleteFileStorage(upload.name)
      })
      .catch(error => console.log(error))
    }

    private deleteFileData(key : string){
      return this.db.list('${this.basePath}/').remove(key);
    }

    private deleteFileStorage(name : string){
      let storageRef = firebase.storage().ref();
      storageRef.child('${this.basePath}/${name}').delete()
    }

    getFileUploads(numberItems , basePath) : AngularFireList<Upload[]>
    {
      return this.db.list(basePath , ref =>
        ref.limitToLast(numberItems)
        );
    }
}
