import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DownloadDirective } from './DownloadDirective';
//import { DownloadDirective } from './download.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DownloadDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Download_AngularDemo';
  jobProfileId: string = '7AD9C493-698B-4901-963A-E8948898FC2A'

  constructor() {
    console.log('AppComponent');
  }
}
