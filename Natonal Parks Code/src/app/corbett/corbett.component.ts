import { Component, OnInit } from '@angular/core';
import { UploadService } from '../shared/upload.service';
import { Upload } from '../shared/upload';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { CommentService } from '../shared/comment.service';
import { FormGroup , Validators , FormBuilder , FormsModule , ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-corbett',
  templateUrl: './corbett.component.html',
  styleUrls: ['./corbett.component.less']
})
export class CorbettComponent implements OnInit {

  selectedFiles : FileList;
  currentUpload : Upload;
  uploadedImage : File;
  submitted : boolean;
  showSuccessMessage : boolean;
  

  constructor(private upSvc : UploadService , private ng2ImgMax : Ng2ImgMaxService , private fb : FormBuilder , private commentService : CommentService) { }

  fileUploads : any;
  formControls = this.commentService.form.controls;
  commentsArray = [];

  ngOnInit() {

    //hide progress bar
    var x = document.getElementById("pbar");    
    x.style.display = "none";

    //get the image from firebase storage
    this.upSvc.getFileUploads(12 , '/corbet').snapshotChanges().pipe(map( changes => {
      return changes.map( c => ({ key : c.payload.key , ...c.payload.val()}));
    })).subscribe( fileUploads => {
      this.fileUploads = fileUploads  
      console.log(fileUploads);
    });

    //get comments list

    this.commentService.getComments().subscribe(
      list => {
        this.commentsArray = list.map(
        item => {
          return {
            $key : item.key,
            ...item.payload.val()

          };
        });
      });
      }

  detectFiles(event){
    this.selectedFiles = event.target.files;

    this.uploadedImage = event.target.files[0];
  }

  uploadSingle(){

    var x = document.getElementById("pbar");
    x.style.display = "block";

      setTimeout( () => {
      document.getElementById("pbar").style.display = "none" }
      , 4000);
    

      let image = this.uploadedImage;
    this.ng2ImgMax.resizeImage(image , 200 ,200).subscribe(
      result => {
        this.uploadedImage = new File([result] , result.name);
        let file = this.uploadedImage
        this.currentUpload = new Upload(file);
        this.upSvc.pushUpload(this.currentUpload , '/corbet/');
      },
      error =>{
        console.log(error);
      }
    );
  }

  onSubmit(){
    this.submitted = true;
    if(this.commentService.form.valid) {
      this.commentService.insertComment(this.commentService.form.value);
    this.showSuccessMessage = true;
    setTimeout( () => this.showSuccessMessage = false , 3000);
    this.submitted  = false;
    this.commentService.form.reset();
    this.commentService.form.setValue({
      $key : null,
      comment : '',
    });
  }
}
}