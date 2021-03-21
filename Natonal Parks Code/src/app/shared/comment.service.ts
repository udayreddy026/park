import { Injectable } from '@angular/core';
import { AngularFireDatabase , AngularFireList} from 'angularfire2/database';
import { FormControl , FormGroup , Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private db : AngularFireDatabase) { }

  commentList : AngularFireList<any>;

  form = new FormGroup({
    $key : new FormControl(null),
    comment : new FormControl('',[Validators.required , Validators.maxLength(30)])
  });

  getComments(){
    this.commentList = this.db.list('comments');
    return this.commentList.snapshotChanges();
  }

  insertComment(comments){

    console.log(comments);
    this.commentList = this.db.list('/comments');
    if(comments){
      this.commentList.push({
        comment : comments.comment
      });
    }
  }

  deleteComment( $key : string){
    this.commentList.remove($key);
  }

}
