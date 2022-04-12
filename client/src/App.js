import './App.css';
import React from 'react';

function App() {
  const [tags, setTags] = React.useState('');
  const [picArray, setPicArray] = React.useState(null);

  const getPicArray = () => {
    fetch('/api/search/' + tags)
      .then(response => response.json())
      .then(data => {
        console.log('Request received! Result:\n');
        console.log(data);
        let pictures = data.photo.map((pic) => {
          var srcPath = 'https://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'.jpg';
          return(
            <img alt={pic.title} src={srcPath}></img>
          )
        })
        console.log('pictures: ');
        console.log(pictures);
        return(pictures);
      })
      .then(pictures => {
        console.log('Response: ');
        console.log(pictures);
        setPicArray(pictures);
      })
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
