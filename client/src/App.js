import './App.css';
import React from 'react';

function App() {
  const [tags, setTags] = React.useState('');
  const [picArray, setPicArray] = React.useState(null);

  const getPicArray = () => {
    fetch('/api/search/' + tags)
      .then(response => {
        console.log('Request received! Result:\n');
        console.log(response);
        let pictures = response.json().photo.map((pic) => {
          var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
          return(
            <img alt={pic.title} src={srcPath}></img>
          )
        })
      })
      .then(response => setPicArray(response))
  };

  return (
    <div className="app">
      <h1>Flickr Search</h1>
      <input placeholder="cats, cute, fluffy" value={tags} onChange={event => setTags(event.target.value.split(" "))} /> {/* TODO: make input processing more resilient. */}
      <button onClick={getPicArray}>Search</button>
      <div>
        {picArray}
      </div>
    </div>
  );
}

export default App;
