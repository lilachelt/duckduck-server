import { getDuckDuckFullResponse, getUrlsAndTitlesRelatedTopics, getLastSearchesTopicsFromFile} from './routh-methods';
import express from 'express';
const server = express();
const port = process.env.NODE_PORT || 1337;
const cors = require('cors');

server.listen(port, () => console.log(`server started on port ${port}`));

server.use(cors({
  origin: 'http://localhost:3000'
}));

server.get('/', getDuckDuckFullResponse);
server.get('/urlsAndTitles', getUrlsAndTitlesRelatedTopics);
server.post('/',getLastSearchesTopicsFromFile)

