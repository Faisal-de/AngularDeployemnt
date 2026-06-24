import { Injectable, signal } from '@angular/core';

export interface Track {
  id: string;
  title: string;
  artist: string;
  type: 'Nazam' | 'Naat' | 'Lo-Fi' | 'Synth';
  audioUrl: string;
  coverIcon: string;
}

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audioContext = new Audio();
  
  // Clean signals for component binding
  currentTrack = signal<Track | null>(null);
  isPlaying = signal<boolean>(false);

  constructor() {
    // Listen to native audio events to update our state automatically
    this.audioContext.addEventListener('ended', () => this.isPlaying.set(false));
  }

  playTrack(track: Track) {
    if (this.currentTrack()?.id === track.id) {
      this.togglePlay();
      return;
    }

    this.currentTrack.set(track);
    this.audioContext.src = track.audioUrl;
    this.audioContext.load();
    this.audioContext.play()
      .then(() => this.isPlaying.set(true))
      .catch(err => console.error('Audio playback failed:', err));
  }

  togglePlay() {
    if (!this.currentTrack()) return;
    
    if (this.isPlaying()) {
      this.audioContext.pause();
      this.isPlaying.set(false);
    } else {
      this.audioContext.play()
        .then(() => this.isPlaying.set(true))
        .catch(err => console.error(err));
    }
  }
}