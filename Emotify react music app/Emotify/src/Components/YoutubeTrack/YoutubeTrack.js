import React from 'react';
import './YoutubeTrack.css'; // Import the CSS for YouTubeTrack component

function YouTubeTrack({ video }) {
  const embedUrl = `https://www.youtube.com/embed/${video.id}`;

  return (
    <div className="youtube-track">
      {/* <div className="track-info">
        <h4>{video.title}</h4>
        <p>{video.artist}</p>
      </div> */}
      <iframe
        width="560"
        height="315"
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default YouTubeTrack;
