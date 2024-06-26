import React, { useState } from 'react';
import "../styles.scss";

function VolumeControl() {
  const [volume, setVolume] = useState(50); // Initial volume value
  const [muted, setMuted] = useState(false); // Initial mute state

  const handleVolumeChange = (event) => {
    setVolume(event.target.value); // Update volume state when the input range value changes
    setMuted(false); // Unmute when volume changes
  };

  const handleMuteToggle = () => {
    setMuted(!muted); // Toggle mute state
    if (!muted) {
      setVolume(0); // Set volume to 0 when muting
    }
  };

  return (
    <div className="volume-control">
      <button className="volume-icon" onClick={handleMuteToggle}>
        {muted ? (
          <i className="fas fa-volume-mute"></i>
        ) : volume > 50 ? (
          <i className="fas fa-volume-up"></i>
        ) : volume > 0 ? (
          <i className="fas fa-volume-down"></i>
        ) : (
          <i className="fas fa-volume-off"></i>
        )}
      </button>
      <input
        type="range"
        min="0"
        max="100"
        value={muted ? 0 : volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
}

export default VolumeControl;
