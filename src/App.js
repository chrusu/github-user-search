import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import UserSerach from './components/user-search/userSearch';
import axios from 'axios';

const GIT_USER_SEARCH = 'https://api.github.com/search/users?q='

class App extends Component {
  constructor(props){
    super(props);
    this.state= {
      data: []
    }
  }

  getUsers = (searchTerm, callback) => {
    console.log('searchTerm: ', searchTerm);
    let url = `${GIT_USER_SEARCH}${searchTerm}`;
      axios.get(url)
      .then((response) => {
        // handle success
        const items = response.data.items;
        callback(items);
        // this.setState({data: items})
        // return items;

      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      }); 
  }

  
  handleMouseOver = (selected) => {
    console.log('handleMouseOver: ', selected);
  }

  renderContent = (item)=> {
    return (
      <div>
        <img className={"user-image"} src={item.avatar_url} alt={item.login} />
        <div className={"name"}>
          {item.login}
        </div>
      </div>
    );
  };



  render() {
    return (
      <div className="App">
        <UserSerach renderContent={this.renderContent} getData={this.getUsers} ></UserSerach>
        <div>fasdfsadf</div>
      </div>
    );
  }
}

export default App;
