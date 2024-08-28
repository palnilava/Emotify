import React from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';


class PlayList extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }
  render() {
    return (
      <div className="Playlist">
        <h1>Create a PlayList</h1>
        <div className='play'>
        <input
        placeholder='Write the playlist name here'
          value={this.props.playlistName}
        
          onChange={this.handleNameChange}
        />
        <TrackList
          tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove}
          isRemoval={true}
        />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
        </div>
      </div>
    );
  }
}


export default PlayList;
