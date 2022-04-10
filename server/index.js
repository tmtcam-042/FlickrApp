const express = require('express');
const app = express();
const port = 3001;
const unirest = require("unirest");

app.get('/api/search/:tags', (req, res) => {
  const request = unirest("GET", "https://api.flickr.com/services/rest/");
  request.query({ 
      "method": "flickr.photos.search",
      "api_key": "3aec1ebfb8c286a5fd429415e85490e5",
      "tags": req.params.tags,
      "per_page" : "10",
      "page": "1",
      "format": "json",
      "nojsoncallback": "1"
     });

  request.end(function (response) {
    if (response.error) throw new Error(response.error);

    res.json(response.body.photos || {});
    console.log(response.body.photos);
  });

});

app.listen(port, () => {
  console.log(`Flickr app listening at http://localhost:${port}`);
});