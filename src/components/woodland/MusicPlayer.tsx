"use client";
import { ChevronDown, ChevronUp, Pause, Play, SkipBack, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function time(value: number) {
  return `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, "0")}`;
}
export function MusicPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(48);
  const [volume, setVolume] = useState(0.35);
  const [collapsed, setCollapsed] = useState(true);
  const [message, setMessage] = useState("A little soundtrack for your stay");
  useEffect(() => {
    const element = audio.current;
    if (!element) return;
    element.volume = 0.35;
    void element.play().catch(() => setMessage("Press play. Stay a little while."));
    return () => element.pause();
  }, []);
  async function toggle() {
    const element = audio.current;
    if (!element) return;
    if (!element.paused) element.pause();
    else {
      try {
        await element.play();
      } catch {
        setMessage("Sound could not start. Try play again.");
      }
    }
  }
  function changeVolume(next: number) {
    setVolume(next);
    if (audio.current) audio.current.volume = next;
  }
  return (
    <aside className={`music-player ${collapsed ? "is-collapsed" : ""}`} aria-label="Music player">
      <audio
        ref={audio}
        src="/media/a-place-to-land.m4a"
        loop
        preload="metadata"
        onPlay={() => {
          setPlaying(true);
          setMessage("Original ambient loop · made for this little corner");
        }}
        onPause={() => setPlaying(false)}
        onTimeUpdate={() => setPosition(audio.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(audio.current?.duration || 48)}
        onError={() => {
          setPlaying(false);
          setMessage("The soundtrack is unavailable right now.");
        }}
      />
      <div className="music-main">
        <div className={`record-art ${playing ? "is-spinning" : ""}`} aria-hidden="true">
          <span>m</span>
        </div>
        <div className="music-title">
          <span className="tiny-label">{playing ? "NOW PLAYING" : "THE LISTENING CORNER"}</span>
          <strong>A place to land</strong>
          <span>an original little daydream</span>
        </div>
        <button
          type="button"
          className="play-button"
          onClick={toggle}
          aria-label={playing ? "Pause music" : "Play music"}
        >
          {playing ? (
            <Pause size={16} fill="currentColor" />
          ) : (
            <Play size={16} fill="currentColor" />
          )}
        </button>
        <button
          type="button"
          className="icon-button player-collapse"
          aria-label={collapsed ? "Expand music player" : "Minimize music player"}
          aria-expanded={!collapsed}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
      </div>
      <div className="music-details" hidden={collapsed}>
        <div className="music-seek">
          <span>{time(position)}</span>
          <input
            type="range"
            aria-label="Song position"
            min="0"
            max={duration}
            step="0.1"
            value={position}
            onChange={(e) => {
              const next = Number(e.target.value);
              if (audio.current) audio.current.currentTime = next;
              setPosition(next);
            }}
          />
          <span>{time(duration)}</span>
        </div>
        <div className="music-bottom">
          <button
            type="button"
            className="icon-button"
            aria-label="Restart song"
            onClick={() => {
              if (audio.current) audio.current.currentTime = 0;
              setPosition(0);
            }}
          >
            <SkipBack size={13} />
          </button>
          <p role="status">{message}</p>
          <button
            type="button"
            className="icon-button"
            aria-label={volume ? "Mute music" : "Unmute music"}
            onClick={() => changeVolume(volume ? 0 : 0.35)}
          >
            {volume ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>
          <input
            aria-label="Music volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => changeVolume(Number(e.target.value))}
          />
        </div>
      </div>
    </aside>
  );
}
