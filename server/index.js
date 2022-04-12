const express = require('express');
const app = express();
const port = 3001;
const unirest = require("unirest");

/*
This GET request is called by the frontend function getPicArray. It constructs a call
to Flickr's photo search API using unirest for readability, and returns a json
file containing various information about images that match the submitted tags.
*/
app.get('/api/search/:tags', (req, res) => {
  const request = unirest("GET", "https://api.flickr.com/services/rest/");
  request.query({ 
      "method": "flickr.photos.search",
      "api_key": "3aec1ebfb8c286a5fd429415e85490e5",
      "tags": req.params.tags,
      "per_page" : "100",
      "page": "1",
      "format": "json",
      "nojsoncallback": "1",
      "safe_search": "1"
     });

  request.end(function (response) {
    if (response.error) throw new Error(response.error);
    res.json(response.body.photos || {}); // If the response from Flickr is null, return null to the frontend.
  });

});

app.listen(port, () => {
  console.log(`Flickr app listening at http://localhost:${port}`);
});