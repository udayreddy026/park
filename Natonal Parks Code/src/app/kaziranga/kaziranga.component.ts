import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpEventType} from '@angular/common/http';
import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Component({
  selector: 'app-kaziranga',
  templateUrl: './kaziranga.component.html',
  styleUrls: ['./kaziranga.component.less']
})
export class KazirangaComponent implements OnInit {

  selectedFiles : FileList;
  currentUpload : Upload;
  uploadedImage : File;

  constructor(private upSvc : UploadService , private ng2ImgMax : Ng2ImgMaxService) { }

  fileUploads : any;

  ngOnInit() {

    //hide progress bar
    var x = document.getElementById("pbar");    
    x.style.display = "none";

    //get the image from firebase storage
    this.upSvc.getFileUploads(12 , '/kaziranga').snapshotChanges().pipe(map( changes => {
      return changes.map( c => ({ key : c.payload.key , ...c.payload.val()}));
    })).subscribe( fileUploads => {
      this.fileUploads = fileUploads  
      console.log(fileUploads);
    });
  }


  detectFiles(event){
    this.selectedFiles = event.target.files;

    this.uploadedImage = event.target.files[0];
  }

  uploadSingle(){

    var x = document.getElementById("pbar");
    x.style.display = "block";
    
    // let file = this.selectedFiles.item(0);
    // this.currentUpload = new Upload(file);
    // this.upSvc.pushUpload(this.currentUpload , '/corbet/');

      let image = this.uploadedImage;
    this.ng2ImgMax.resizeImage(image , 200 ,200).subscribe(
      result => {
        this.uploadedImage = new File([result] , result.name);
        let file = this.uploadedImage
        this.currentUpload = new Upload(file);
        this.upSvc.pushUpload(this.currentUpload , '/kaziranga/');
      },
      error =>{
        console.log(error);
      }
    );

    setTimeout( () => {
      document.getElementById("pbar").style.display = "none" }
      , 4000);
  }
}
