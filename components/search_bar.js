import React, { Component } from 'react';

class SearchBar extends Component {
	constructor(props){
		super(props);
		
		this.state = {
            term: '',
            temp: ''
            };
	}
	render() {
		return(
			<div className="search-bar">
            <input
				defaultValue={this.state.term} 
                onChange={event => this.storeInput(event.target.value)} />                
                <button onClick={() => this.onInputChange(this.state.temp)} > Search </button>
			</div>
		);
	}
    
    storeInput(term) {
        this.setState({temp: term});
    }
    
    onInputChange(term) {
        this.setState({term: term});
        this.props.onSearchTermChange(term);
    }
    
}

export default SearchBar;