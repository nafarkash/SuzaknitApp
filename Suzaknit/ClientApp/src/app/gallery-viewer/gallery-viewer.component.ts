import { Component, OnInit } from '@angular/core';
import { Image } from '../models/image'
import { PhotosService } from '../services/photos.service';
import { EImageCategory } from '../models/image-category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gallery-viewer',
  templateUrl: './gallery-viewer.component.html',
  styleUrls: ['./gallery-viewer.component.css']
})
export class GalleryViewerComponent implements OnInit {
  images: Image[];
  displayCustom: boolean;
  activeIndex: number = 0;

  constructor(private photosService: PhotosService, private readonly route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const galleryParamString: string = params.get("category");
      const galleryParam: EImageCategory = EImageCategory[galleryParamString];
      if (galleryParam !== null && galleryParam !== undefined) {
        this.photosService.getByCategory(galleryParam).subscribe(images => {
          this.images = images
        });
      }
    });

  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }
}
