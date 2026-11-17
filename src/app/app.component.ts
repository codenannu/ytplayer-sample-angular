import { Component, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DecimalPipe } from "@angular/common";
import { YouTubePlayerComponent } from "@codenkay/video-ytplayer-angular";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [YouTubePlayerComponent, FormsModule, DecimalPipe],
  template: `
    <h1>YouTube Angular sample</h1>
    <input [(ngModel)]="videoId" placeholder="YouTube URL or ID" />
    <button type="button" (click)="load()">Load</button>
    <button type="button" (click)="playerCmp?.getPlayer()?.play()">Host play</button>
    <button type="button" (click)="playerCmp?.getPlayer()?.pause()">Host pause</button>
    @if (activeId) {
      <div style="aspect-ratio: 16/9; background: #000; max-width: 960px; margin-top: 1rem">
        <yt-video-player
          #playerCmp
          [videoId]="activeId"
          [privacyEnhanced]="true"
          (watchTime)="lastWatchTime = $event"
          (error)="onError($event)"
        />
      </div>
    }
    <p>watchTime: {{ lastWatchTime | number: "1.0-1" }}s</p>
    @if (error) {
      <p style="color: crimson">{{ error }}</p>
    }
  `,
})
export class AppComponent {
  @ViewChild("playerCmp") playerCmp?: YouTubePlayerComponent;
  videoId = "dQw4w9WgXcQ";
  activeId: string | null = null;
  lastWatchTime = 0;
  error = "";

  load() {
    this.error = "";
    this.activeId = this.videoId.trim() || null;
  }

  onError(err: { message?: string }) {
    this.error = err?.message ?? "Player error";
  }
}
