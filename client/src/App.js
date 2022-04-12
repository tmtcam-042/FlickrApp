import './App.css';
import './Search-bar.css';
import logo from './logo.svg';
import React from 'react';

function App() {
  const [tags, setTags] = React.useState('');
  const [picArray, setPicArray] = React.useState(null);

  const getPicArray = () => {
    fetch('/api/search/' + tags)
      .then(response => response.json()) //Process fetched data as JSON
      .then(data => { 
        //For each photo in data, extract link to the image and store it in pictures
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
        return(pictures);
      })
      .then(pictures => setPicArray(pictures));
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
          onChange={event => setTags(event.target.value.split(" "))}  
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
