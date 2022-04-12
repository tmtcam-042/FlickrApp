import React, {useState} from 'react';

import './App.css';
import './Search-bar.css';
import logo from '../../logo.svg';
import Login from '../Login/Login';
import useToken from './useToken';



function App() {
  const [tags, setTags] = useState('');
  const [picArray, setPicArray] = useState(null);

  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  /*
  getPicArray performs a call to the backend with the tag string the user has entered into the webpage.
  Once it receives the result of that call, it processes it as JSON data and constructs links to the image
  sources that match the user-submitted tags on Flickr. 
  The function returns a div containing the sourced image and its title.
  */
  const getPicArray = () => {
    fetch('/api/search/' + tags)
      .then(response => response.json()) //Process fetched data as JSON
      .then(data => { 
        //For each photo in data, construct link to the image and return a div containing the image along with its title to pictures
        let pictures = data.photo.map((pic) => {
          var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
          
          return(
            <div className="responsive">
              <div className="gallery">
                <a target="_blank" rel="noreferrer" href={srcPath}>
                  <img alt={pic.title} src={srcPath}></img>
                </a>
                <div className="desc">{pic.title}</div>
              </div>
            </div> 
          );

        })
        setPicArray(pictures)
      })
  };


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Flickr Search</h1>
        <div className="search-bar">
	        <input 
          type="text" 
          name="search"
          pattern=".*\S.*" required 
          onChange={event => setTags(event.target.value.split(" "))} //Each key input to the search bar is sent to {tags}  
          onKeyPress={event => {
            if (event.key ==='Enter') {
              getPicArray(); 
              event.target.blur(); // Remove cursor from search bar to indicate search completion
            }
          }}
          />
          <button className="search-btn" type="button" onClick={getPicArray}>
            <span>Search</span>
          </button>
        </div>
      </header>
      <div className="Images">
        {picArray}
      </div>
    </div>
  );
}

export default App;
