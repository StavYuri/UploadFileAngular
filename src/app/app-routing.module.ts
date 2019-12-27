import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UploadToBucketComponent} from './upload-to-bucket/upload-to-bucket.component';

const routes: Routes = [
  {
    path: 'uploadToBucket',
    component: UploadToBucketComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
