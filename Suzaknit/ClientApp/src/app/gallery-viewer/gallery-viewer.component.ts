import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gallery-viewer',
  templateUrl: './gallery-viewer.component.html',
  styleUrls: ['./gallery-viewer.component.css']
})
export class GalleryViewerComponent implements OnInit {
  images: any;
  public EImageCategory: EImageCategory

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '960px',
      numVisible: 4
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];


  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    console.log(this.images);
    http.get<UploadedImages>(baseUrl + 'api/image/cactus').subscribe(result => {
      console.log('result: ' + result);
      this.images = result;
    }, error => console.error(error));
    console.log('images: ' + this.images);
  }

  ngOnInit() {
  }

}

export interface UploadedImages {
  id: number;
  gallery: string;
  category: string;
  name: string;
}

export enum EImageCategory {
  Cactus = 0,
  Pupets,
  Orchids,
  Monuments,
  Paitings
}
