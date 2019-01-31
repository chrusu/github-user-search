import React, { Component } from 'react';
import './App.css';
import AutoComplete from './components/auto-complete/autoComplete';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);

    this.state= {
      data: []
    }
  }

  getUsers = (searchTerm, itemsCallback, stateCallback) => {
    const url = `https://api.github.com/search/users?q=${encodeURI(searchTerm)}`;
      axios.get(url)
      .then((response) => {
        // handle success
        const items = response.data.items;
        itemsCallback(items);
      })
      .catch((error) => {
        // handle error
        stateCallback(error.message);
      })
  }

  renderContent = (item)=> {
    return (
      <div className={"user-item"}>
        <img className={"user-image"} src={item.avatar_url} alt={item.login} />
        <div className={"user-name"}>
          {item.login}
        </div>
        <div className={"user-score"}>
          {item.score}
        </div>
      </div>
    );
  };



  render() {
    return (
      <div className="App">
        <AutoComplete 
          renderContent={this.renderContent} 
          getData={this.getUsers} 
          searchName="Username:" 
          count={5}
        />
      </div>
    );
  }
}

export default App;
