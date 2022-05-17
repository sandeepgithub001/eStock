import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private httpService: HttpService
  ) {
  }

  public uploadImage(formData: FormData) {
    return this.httpService.postImage("Attachment/UploadAttachment/", formData);
  }

  public deleteImage(fileName) {
    return this.httpService.get("Attachment/DeleteAttachment/" + fileName);
  }

}
