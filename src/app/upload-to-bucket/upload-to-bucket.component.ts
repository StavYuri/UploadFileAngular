import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import { FileUploadService } from '../services/file-upload.service';
import { ToastrService } from 'ngx-toastr';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload-to-bucket',
  templateUrl: './upload-to-bucket.component.html',
  styleUrls: ['./upload-to-bucket.component.css']
})

export class UploadToBucketComponent implements OnInit{
  file : File;
  progress: number = 0;
  @ViewChild('myInput',{static: true}) myInputVariable: ElementRef;
  
  constructor(private fileUploadService: FileUploadService, private toastrService: ToastrService) {}

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  uploadFile(){
    this.fileUploadService.uploadFile(this.file)
    .subscribe((event: HttpEvent<any>) => {
        this.resetFile();
        switch(event.type){
            case HttpEventType.UploadProgress:
              this.progress = Math.round(event.loaded / event.total * 100);
              break;
            case HttpEventType.ResponseHeader:
              if(event.status == 200){
                this.toastrService.success("File was uploaded successfully");         
              }
              if(event.status == 500){
                this.toastrService.error("Error while uploading file");
              }
        }
    });
  }

  fileIsUploaded()
  {
    let result = false;
    if(this.file && this.file != null )
    {
      result = true;
    }
    return result;
  }

  resetFile()
  {
    this.myInputVariable.nativeElement.value = "";
    this.file = null;
    this.progress = 0;
  }

  ngOnInit() {}
}
