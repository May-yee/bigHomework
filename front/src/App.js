import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './style.css';
import JoingIndex from './components/JoingIndex';
import Post from './components/Post';
import Register from './components/Register'
import PostCreate from './components/PostCreate';
import PostEdit from './components/PostEdit';
import OwnMembers from './components/OwnMembers';
import MemberEdit from './components/MemberEdit';
import OwnPost from './components/OwnPost';
import Members from './components/Members';
import Error from './components/Error';




class App extends Component {
  render() {
    return (      
       <BrowserRouter>
            <Switch>
             <Route path="/" component={JoingIndex} exact/>
             <Route path="/Joing/index/:id" component={JoingIndex}/>
             <Route path="/Joing/register" component={Register}/>            
             <Route path="/Joing/ownpost/:id" component={OwnPost}/>
             <Route path="/Joing/postcreate" component={PostCreate}/>
             <Route path="/Joing/postedit/:id" component={PostEdit}/>
             <Route path="/Joing/memberedit/:id" component={MemberEdit}/>
             <Route path="/Joing/post/:id" component={Post}/>
             <Route path="/Joing/ownmembers/:id" component={OwnMembers}/>
             <Route path="/Joing/members/:id" component={Members}/>
             <Route component={Error}/> 
           </Switch>
      </BrowserRouter>
    );
  }
  
}
 
export default App;
