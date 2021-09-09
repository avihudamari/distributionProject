import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth1/Auth1';
import DefineDistribution from './containers/DefineDistribution/DefineDistribution';
import TrackDistribution from './containers/TrackDistribution/TrackDistribution';
import WorkArrangement from './containers/WorkArrangement/WorkArrangement';
import Logout from './containers/Auth1/Logout/Logout';
import Control from './components/Control/Control';
import Chat from './components/Messenger/Messenger.jsx';
import Blog from './components/Blog/Blog';
import ManageDistributors from './components/ManageDistributors/ManageDistributors';

class App extends Component {

    state = {
      userConnected: null
    }

    connectedHandler = (user) => {
      this.setState({
        userConnected: user
      })
    }

    disonnectedHandler = () => {
      this.setState({
        userConnected: null
      })
    }

  render () {
    let routes = null;

    //disconnected
    if (this.state.userConnected == null) {
      routes =
      <Switch>
        <Route path='/' exact
          component={() => <Auth
                connected={this.connectedHandler} 
          />}
        />
        <Redirect to='/'/>
      </Switch>
    }
    else {
        //admin connected
        if (this.state.userConnected.isAdmin) {
          routes =
          <Switch>
            <Route path='/defineDistribution' component={DefineDistribution}/>
            <Route path='/trackDistribution' component={TrackDistribution}/>
            <Route path='/control' component={Control}/>
            <Route path='/chat' component={Chat}/>
            <Route path='/blog' component={Blog}/>
            <Route path='/manageDistributors' component={ManageDistributors}/>
            <Route path='/logout' component={() => <Logout disconnected={this.disonnectedHandler}/>}/>
            <Redirect to='/defineDistribution'/>
        </Switch>
        }
        //noAdmin connected
        else {
          routes =
          <Switch>
          <Route path='/workArrangement' component={() => <WorkArrangement userConnected={this.state.userConnected}/>}/>
          <Route path='/chat' component={Chat}/>
          <Route path='/blog' component={Blog}/>
          <Route path='/logout' component={() => <Logout disconnected={this.disonnectedHandler}/>}/>
          <Redirect to='/workArrangement'/>
        </Switch>
        }
  }
    // let routes = (
    //   <Switch>
    //     <Route path='/defineDistribution' component={DefineDistribution}/>
    //     <Route path='/trackDistribution' component={TrackDistribution}/>
    //     <Route path='/workArrangement' component={WorkArrangement}/>
    //     <Route path='/control' component={Control}/>
    //     <Route path='/chat' component={Chat}/>
    //     <Route path='/blog' component={Blog}/>
    //     <Route path='/manageDistributors' component={ManageDistributors}/>
    //     <Route path='/logout' component={() => <Logout disconnected={this.disonnectedHandler}/>}/>
    //     <Route path='/' exact component={() => <Auth
    //             adminConnected={this.adminconnectedHandler} 
    //             noAdminConnected={this.noAdminconnectedHandler}
    //             />}
    //     />
    //     <Redirect to='/'/>
    //   </Switch>
    // );

    return (
      <Layout
        userConnected={this.state.userConnected}
      >
        {routes}
      </Layout>  
    );
  }
}

export default App;