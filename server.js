const express = require('express');
const fetch = require('node-fetch');

const downstreamApiHosts = new Map([
  ['yelp', 'https://api.yelp.com'],
  ['google', 'https://maps.googleapis.com'],
]);

const app = express();

// Proxy API requests downstream
app.get('/api/:endpoint/*', async (req, res) => {
  try {
    const headers = { ...req.headers };
    const { endpoint } = req.params;

    // Construct the full URL to the downstream API by replacing the defined prefix with the appropriate host
    const url = `${downstreamApiHosts.get(endpoint)}${req.url.replace(`/api/${endpoint}`, '')}`;

    // Include all headers except for he "host" header, which makes downstream APIs unhappy ("Hostname/IP does not match certificate's altnames")
    delete headers.host;

    // Proxy the request to the downstream API
    const response = await fetch(url, { headers });
    const contentType = response.headers.get('content-type');

    // the response may be in multiple formats
    if (contentType.indexOf('application/json') !== -1) {
      // response is in json format
      return res.status(response.status).json(await response.json());
    } else if (contentType.startsWith('image/')) {
      res.type(contentType);
      return res.status(response.status).send(await response.buffer());
    } else {
      // response is in text (or html) format
      return res.status(response.status).send(await response.text());
    }
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(3001);
