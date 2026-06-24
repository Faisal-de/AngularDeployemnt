import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService, Track } from '../../core/services/audio';

@Component({
  selector: 'app-explorer-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './explorer.view.html',
  styleUrl: './explorer.view.css'
})
export class ExplorerView {
  private audioService = inject(AudioService);
  
  // Connect the global audio service states to properties the HTML can read
  activeTrack = this.audioService.currentTrack;
  isPlaying = this.audioService.isPlaying;

  featuredTracks: Track[] = [
    { 
      id: 'devops-lofi', 
      title: 'DevOps Lo-Fi Beats', 
      artist: 'Continuous Integration Radio', 
      type: 'Lo-Fi', 
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', 
      coverIcon: '💿' 
    },
    { 
      id: 'csharp-synth', 
      title: 'Deep Focus C# Synth', 
      artist: 'High-Energy Coding Session', 
      type: 'Synth', 
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', 
      coverIcon: '⚡' 
    }
  ];

  spiritualTracks: Track[] = [
    { 
      id: 'jj-ilahi', 
      title: 'Ilahi Teri Chaukhat Par', 
      artist: 'Junaid Jamshed', 
      type: 'Nazam', 
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', 
      coverIcon: '🕌' 
    },
    { 
      id: 'jj-muhammad', 
      title: 'Muhammad Ka Roza', 
      artist: 'Junaid Jamshed', 
      type: 'Naat', 
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', 
      coverIcon: '✨' 
    },
    { 
      id: 'jj-dil', 
      title: 'Mera Dil Badal De', 
      artist: 'Junaid Jamshed', 
      type: 'Nazam', 
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', 
      coverIcon: '🌙' 
    }
  ];

  selectTrack(track: Track) {
    this.audioService.playTrack(track);
  }
}