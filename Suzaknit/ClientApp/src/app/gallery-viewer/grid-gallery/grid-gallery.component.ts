import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Image } from '../../models/image'

@Component({
  selector: 'app-grid-gallery',
  templateUrl: './grid-gallery.component.html'
})
export class GridGalleryComponent implements OnInit, OnDestroy {

  @Input() images: Image[];
  @Input() cols: number = 4;
  @Input('cols.xs') cols_xs: number = 1;
  @Input('cols.sm') cols_sm: number = 2;
  @Input('cols.md') cols_md: number = 3;
  @Input('cols.lg') cols_lg: number = 4;
  @Input('cols.xl') cols_xl: number = 6;
  @Input() rowHeight: number = 1;
  @Input() gutterSize: number = 1;
  @Output() imageClick: EventEmitter<number> = new EventEmitter<number>();
  mediaWatcher: Subscription;

  constructor(private media: MediaObserver) {
  }

  ngOnInit() {
    this.mediaWatcher = this.media.media$.subscribe((change: MediaChange) => {
      this.cols = Number(this[`cols_${change.mqAlias}`]);
    });
  }

  ngOnDestroy(): void {
    this.mediaWatcher.unsubscribe();
  }
}
