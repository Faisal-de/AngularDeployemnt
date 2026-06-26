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

  // New progress signals exposed for the progress line tracking
  currentTime = this.audioService.currentTime;
  duration = this.audioService.duration;
  currentTimeFormatted = this.audioService.currentTimeFormatted;
  durationFormatted = this.audioService.durationFormatted;

  handlePlaybackToggle() {
    this.audioService.togglePlay();
  }

  // Expose skipping features to the buttons
  handleSkip(seconds: number) {
    this.audioService.skipTime(seconds);
  }

  // Expose manual timeline slider dragging
  handleSeek(event: Event) {
    const input = event.target as HTMLInputElement;
    this.audioService.seekTime(Number(input.value));
  }
}