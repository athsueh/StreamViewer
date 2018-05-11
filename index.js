import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style/style.css';
import registerServiceWorker from './registerServiceWorker';

import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

import {GoogleAPI,GoogleLogin,GoogleLogout} from 'react-google-oauth'

const YOUTUBE_API_KEY = 'YOUR_API_KEY_HERE';
const GOOGLE_CLIENT_ID = 'YOUR_ID_HERE';



class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			videos: [],
			selectedVideo: null,
            logged: false,
            user: {},
            curName: ''
		};
		
        this.videoSearch('react.js');
        
	}
	
    videoSearch(term) {
        YTSearch({key: YOUTUBE_API_KEY, term: term}, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		});
    }
    
    getLogin(user) {
        this.setState({
            logged: true,
            user,
            curName: user.getBasicProfile().getName()
        })
        console.log(user);
        console.log(user.getBasicProfile().getName());
    }
    
    getLogout(user) {
        this.setState({
            logged: false,
            user: {}  
        })
    }
        
	render() {
        console.log("Hello!");
		return (
			<div>
                <SearchBar onSearchTermChange={term => this.videoSearch(term)} />
                <GoogleAPI clientId={GOOGLE_CLIENT_ID}
                    onUpdateSigninStatus={(status) => console.log(status)}>
                    <div className='logBtn'>               
                        { this.state.logged ? <div> <GoogleLogout onLogoutSuccess={(response) => 
                        this.getLogout(response)} /> <span> Welcome, {this.state.curName}! </span>
                        </div> : <GoogleLogin onLoginSuccess={(response) => 
                        this.getLogin(response)} /> }
                    </div>
                </GoogleAPI>                   
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList
					onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
					videos={this.state.videos} />                     
			</div>      
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
