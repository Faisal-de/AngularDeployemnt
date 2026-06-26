import { Injectable, signal, computed } from '@angular/core';

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
  
  // Reactive signals for progress bar and timers
  currentTime = signal<number>(0);
  duration = signal<number>(0);

  // Computed strings that automatically format numbers to "0:00" text layouts
  currentTimeFormatted = computed(() => this.formatTime(this.currentTime()));
  durationFormatted = computed(() => this.formatTime(this.duration()));

  constructor() {
    // Listen to native audio events to update our state automatically
    this.audioContext.addEventListener('ended', () => this.isPlaying.set(false));
    
    // Sync time updates as the audio naturally plays forward
    this.audioContext.addEventListener('timeupdate', () => {
      this.currentTime.set(this.audioContext.currentTime);
    });

    // Capture total duration once the audio file loads up metadata definitions
    this.audioContext.addEventListener('loadedmetadata', () => {
      this.duration.set(this.audioContext.duration || 0);
    });
  }

  playTrack(track: Track) {
    if (this.currentTrack()?.id === track.id) {
      this.togglePlay();
      return;
    }

    // 1. Set the new active track state
    this.currentTrack.set(track);
    
    // 2. Clear old playback states and force the browser engine to drop current audio caches
    this.audioContext.pause();
    this.audioContext.src = track.audioUrl;
    this.audioContext.load(); // Forces a fresh fetch of the unique stream URL
    
    // 3. Reset timeline progress state parameters to zero
    this.currentTime.set(0);

    // 4. Fire the new distinct audio source channel safely
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

  // Handle Forward & Backward 5 seconds skipping
  skipTime(seconds: number) {
    if (!this.currentTrack()) return;
    let newTime = this.audioContext.currentTime + seconds;
    
    // Boundary checks so we don't skip outside track runtime limits
    if (newTime < 0) newTime = 0;
    if (newTime > this.audioContext.duration) newTime = this.audioContext.duration;
    
    this.audioContext.currentTime = newTime;
  }

  // Handle manual user progress line range scrubbing/dragging
  seekTime(seconds: number) {
    if (!this.currentTrack()) return;
    this.audioContext.currentTime = seconds;
  }

  // Helper method to turn raw seconds into clean 0:00 digital text strings
  private formatTime(time: number): string {
    if (isNaN(time) || time === 0) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}