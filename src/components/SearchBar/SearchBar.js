import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { searchTerm: null };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    handleTermChange(event) {
        this.setState({
            searchTerm: event.target.value
        });
    }

    handleSearch(event) {
        this.props.searchSpotify(this.state.searchTerm)
        event.preventDefault()
    }

    handleKeyPress(event) {
        if(event.key === 'Enter') {
          this.props.searchSpotify(this.state.searchTerm)
          event.preventDefault()
        }
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" 
                       onChange={this.handleTermChange} 
                       onKeyPress={this.handleKeyPress} autoFocus/>
                <a onClick={this.handleSearch}>SEARCH</a>
            </div>
        );
    }
}

export default SearchBar;