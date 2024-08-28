import React, { Component } from 'react';
import YoutubeTrack from '../YoutubeTrack/YoutubeTrack';
import './YoutubeResults.css';

class YoutubeResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      isLoading: false,
      error: null
    };
  }

  componentDidMount() {
    this.loadVideos();
  }

  loadVideos() {
    const mood = localStorage.getItem('mood');
    if (mood) {
      this.fetchYouTubeVideos(mood);
    }
  }

  fetchYouTubeVideos(mood) {
    this.setState({ isLoading: true });
    const apiKey = process.env.Youtbe_API;
    const maxResults = 10;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${encodeURIComponent(mood)}&type=video&key=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          videos: data.items.map(item => ({
            id: item.id.videoId,
            title: item.snippet.title,
            artist: item.snippet.channelTitle,
            uri: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            thumbnail: item.snippet.thumbnails.default.url
          })),
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({ error, isLoading: false });
        console.error('Error fetching YouTube videos:', error);
      });
  }

  render() {
    const { videos, isLoading, error } = this.state;
    return (
      <div className="yt">
        <h1>YouTube Suggestions</h1>
        <div className='yt-suggestions'>
        {isLoading ? <p>Loading...</p> : null}
        {error ? <p>Error loading videos: {error.message}</p> : null}
        {videos.map(video => (
          <YoutubeTrack key={video.id} video={video} />
        ))}
        </div>
      </div>
    );
  }
}

export default YoutubeResults;
