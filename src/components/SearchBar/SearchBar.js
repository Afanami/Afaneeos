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

    componentWillUpdate() {
        localStorage.setItem('searchTerm', JSON.stringify(this.state.searchTerm));
    }

    componentWillMount() {
        localStorage.getItem('searchTerm') && this.setState({
            searchTerm: JSON.parse(localStorage.getItem('searchTerm'))
        });
    }

    handleTermChange(event) {
        this.setState({
            searchTerm: event.target.value
        });
    }

    handleSearch(event) {
        if(this.state.searchTerm === "") {
            localStorage.setItem('searchTerm', JSON.stringify(this.state.searchTerm))
            return;
        } else {
            this.props.searchSpotify(this.state.searchTerm)
            event.preventDefault()
        }
    }

    handleKeyPress(event) {
        if(this.state.searchTerm === "") {
            localStorage.setItem('searchTerm', JSON.stringify(this.state.searchTerm))
            return;
        } else if (event.key === 'Enter') {
            this.props.searchSpotify(this.state.searchTerm)
            event.preventDefault()
        }
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder={"Enter a song, album, or artist"}
                       value={this.state.searchTerm}
                       onChange={this.handleTermChange} 
                       onKeyPress={this.handleKeyPress} autoFocus/>
                <a onClick={this.handleSearch}>SEARCH</a>
            </div>
        );
    }
}

export default SearchBar;