import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-instruction-video',
  templateUrl: './instruction-video.component.html',
  styleUrls: ['./instruction-video.component.css']
})
export class InstructionVideoComponent implements OnInit {
  private readonly _embeddedYoutubeUrl = 'https://www.youtube.com/embed';
  videoUrl: string;

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const videoUrl: string = params.get("videoUrl");
      this.updateVideo(videoUrl);
    });
  }

  private updateVideo(url: string) {
    this.videoUrl = `${this._embeddedYoutubeUrl}/${url}`;
  }
}
