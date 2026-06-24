import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AudioService } from './core/services/audio';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  private audioService = inject(AudioService);

  // Expose the signals from our service directly to app.html
  activeTrack = this.audioService.currentTrack;
  isPlaying = this.audioService.isPlaying;

  handlePlaybackToggle() {
    this.audioService.togglePlay();
  }
}