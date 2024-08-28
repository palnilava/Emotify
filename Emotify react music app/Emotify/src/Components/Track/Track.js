import React from 'react';
import './Track.css';
import addIcon from './add.png';
import minusIcon from './minus.png';

class Track extends React.Component {
	constructor(props){
			super(props);
			this.addTrack = this.addTrack.bind(this);
			this.removeTrack = this.removeTrack.bind(this);
			this.renderAction = this.renderAction.bind(this);
		}

		//Display "+" if track is not in the playlist
		//Display "-" if track is in the playlist
		renderAction() {
			if (this.props.isRemoval) {
	      return (
	        <a className="Track-action" onClick={this.removeTrack}>
				<img src={minusIcon} alt="Minus" width="30" height="30" />
			</a>
	      );
	    } else {
	     return (
	        <a className="Track-action" onClick={this.addTrack}>
				 <img src={addIcon} alt="Add" width="30" height="30" /> </a>
	      );
	    }
		}

		addTrack(){
			  this.props.onAdd(this.props.track);
		}

		removeTrack(){
				this.props.onRemove(this.props.track);
		}

	render () {
		return(
			<div className="Track">
			  {/* <div className="Track-information">
			    <h3>{this.props.track.name}</h3>
			    <p>{this.props.track.artist} | {this.props.track.album}</p>
			  </div> */}
			  <iframe src={`https://open.spotify.com/embed/track/${this.props.track.id}?utm_source=generator`} 
                        width="500" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media">
                </iframe>
			  {this.renderAction()}
			</div>
		);
	}
}


export default Track;
