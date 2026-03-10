import React, { useEffect, useRef, useState } from "react";
import { useSong } from "../hooks/useSong";
import "../styles/player.scss";

const formatTime = (s = 0) => {
  const sec = Math.floor(s % 60);
  const min = Math.floor(s / 60);
  return `${min}:${sec.toString().padStart(2, "0")}`;
};

const Player = () => {
  const { song } = useSong();
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onTime = () => setCurrentTime(a.currentTime);
    const onLoaded = () => setDuration(a.duration || 0);

    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onLoaded);

    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onLoaded);
    };
  }, [song]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.playbackRate = rate;
  }, [rate]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) a.play().catch(() => setPlaying(false));
    else a.pause();
  }, [playing, song]);

  const togglePlay = () => setPlaying((p) => !p);

  const seekBy = (offset) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Math.max(
      0,
      Math.min(duration || 0, a.currentTime + offset),
    );
    setCurrentTime(a.currentTime);
  };

  const onSeek = (e) => {
    const a = audioRef.current;
    if (!a) return;
    const val = Number(e.target.value);
    a.currentTime = val;
    setCurrentTime(val);
  };

  return (
    <div className="moodify-player">
      <audio ref={audioRef} src={song?.url} preload="metadata" />

      <button
        aria-label="back-5s"
        onClick={() => seekBy(-5)}
        className="moodify-btn skip-btn"
      >
        -5s
      </button>

      <button
        aria-label="play-pause"
        onClick={togglePlay}
        className="moodify-btn play-btn"
      >
        {playing ? "Pause" : "Play"}
      </button>

      <button
        aria-label="forward-5s"
        onClick={() => seekBy(5)}
        className="moodify-btn skip-btn"
      >
        +5s
      </button>

      <div className="progress-wrap">
        <input
          className="moodify-range"
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={onSeek}
        />
        <div className="time-row">
          <span className="time-left">{formatTime(currentTime)}</span>
          <span className="time-right">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="speed-wrap">
        <label htmlFor="speed" className="speed-label">
          Speed
        </label>
        <select
          id="speed"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="speed-select"
        >
          <option value={0.5}>0.5x</option>
          <option value={0.75}>0.75x</option>
          <option value={1}>1x</option>
          <option value={1.25}>1.25x</option>
          <option value={1.5}>1.5x</option>
          <option value={2}>2x</option>
        </select>
      </div>
    </div>
  );
};

export default Player;
