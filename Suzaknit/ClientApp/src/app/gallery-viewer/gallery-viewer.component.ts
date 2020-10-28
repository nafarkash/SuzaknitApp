import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Image } from '../models/image'
import { PhotosService } from '../services/photos.service';

@Component({
  selector: 'app-gallery-viewer',
  templateUrl: './gallery-viewer.component.html',
  styleUrls: ['./gallery-viewer.component.css']
})
export class GalleryViewerComponent implements OnInit {
  images: any;
  public EImageCategory: EImageCategory

  constructor(public photosService: PhotosService) {
    //this.images = this.generateImagesList();
  }

  ngOnInit() {
  }

  private generateRandomImage(): Image {
    const width = 600;
    const height = (Math.random() * (1000 - 400) + 400).toFixed();
    return { gallery: `https://picsum.photos/${width}/${height}/?random` };
  }

  private generateImagesList(): Image[] {
    const images: Image[] = [];
    for (let i = 0; i < 40; i++) {
      const image = this.generateRandomImage();
      //image.alt = `#${i}`;
      images.push(image);
    }
    return images;
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
