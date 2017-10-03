import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Home from './Home';
import About from './About';
import Todo from './Todo';
import Twitch from './Twitch';
import Blog from './Blog';
import BlogSingle from './Blog/BlogSingle';

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/About" component={About} />
    <Route path="/Todo" component={Todo} />
    <Route path="/Twitch" component={Twitch} />
    <Route path="/Blog" component={Blog} />
    <Route path="/Blog/:blog_id" component={BlogSingle} />
  </Route>
);
