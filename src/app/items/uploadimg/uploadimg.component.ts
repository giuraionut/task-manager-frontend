import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  base64ToFile,
  ImageCroppedEvent,
  ImageTransform,
} from 'ngx-image-cropper';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-uploadimg',
  templateUrl: './uploadimg.component.html',
  styleUrls: ['./uploadimg.component.scss']
})
export class UploadimgComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService) { }

  ngOnInit(): void {
    this.imageChangedEvent = this.data['image'];
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';
  scale = 1;
  imageRotation = 0;
  transform: ImageTransform = {};

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log('cropped');
  }

  public uploadFile(): void {
    //console.log(event);
    //console.log(event.target.files[0]);

    const imageFile = base64ToFile(this.croppedImage);

    const fd = new FormData();
    fd.append('image', imageFile, 'image.jpg');
    this.userService
      .uploadAvatar(fd)
      .subscribe();
  }

  public zoomIn() {
    this.scale -= 0.1;
    this.transform = { ...this.transform, scale: this.scale };
  }
  public zoomOut() {
    this.scale += 0.1;
    this.transform = { ...this.transform, scale: this.scale };
  }
}

