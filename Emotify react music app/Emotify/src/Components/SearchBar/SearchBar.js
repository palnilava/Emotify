// import React from 'react';
// import './SearchBar.css';

// class SearchBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       mood: ''
//     };
//     this.state = {term: ' '};
//     this.search = this.search.bind(this);
//     this.handleTermChange = this.handleTermChange.bind(this);
//   }
//   componentDidMount() {
//     this.readQueryParams();
//   }
//   readQueryParams = () => {
//     // Parsing the query parameters directly from window.location.search
//     const queryParams = new URLSearchParams(window.location.search);
//     const mood = queryParams.get('mood'); // "mood" is the name of the query parameter
//     if (mood) {
//       this.setState({ mood });
//     }
//   }
//   search() {
//     this.props.onSearch(this.state.term);
//   }

//   handleTermChange(event) {
//     this.setState({term: event.target.value});
//   }
//   render() {
//     const { mood } = this.state;
//     return (
//       <div className="SearchBar">
//         <input
//           placeholder="Enter a Song, Album or Artist"
//           onChange={this.handleTermChange}
//         />
//         <a onClick={this.search}>SEARCH</a>
//       </div>
//     );
//   }
// }


// export default SearchBar;
import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    // Initialize both `mood` in a single state object
    this.state = {
      mood: ''
    };
    this.search = this.search.bind(this);
    this.readQueryParams = this.readQueryParams.bind(this);
    this.handleMoodChange = this.handleMoodChange.bind(this);
  }

  componentDidMount() {
    this.retrieveMood();
    this.readQueryParams();
  }

  // Retrieve mood from local storage if available
  retrieveMood() {
    const storedMood = localStorage.getItem('mood');
    if (storedMood) {
      this.setState({ mood: storedMood });
    }
  }

  readQueryParams() {
    const queryParams = new URLSearchParams(window.location.search);
    const mood = queryParams.get('mood');
    if (mood) {
      this.setState({ mood });
      localStorage.setItem('mood', mood);  // Save mood to local storage
    }
  }

  search() {
    this.props.onSearch(this.state.mood);
  }

  handleMoodChange(event) {
    this.setState({ mood: event.target.value });
    localStorage.setItem('mood', event.target.value);  // Update mood in local storage
  }

  render() {
    const { mood } = this.state;
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter mood or adjust it"
          value={mood}
          onChange={this.handleMoodChange}
        />
        <a onClick={this.search}>GET SUGGESTIONS</a>
      </div>
    );
  }
}

export default SearchBar;
