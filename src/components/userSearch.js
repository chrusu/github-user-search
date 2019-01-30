import React from 'react';
import './styles.css';
import axios from 'axios';

const GIT_USER_SEARCH = 'https://api.github.com/search/users?q='
let timeout;
let nameInput;

export default class UserSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected: '',
      searchTerm: '',
      displayItems: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount(){
    this.nameInput.focus();
  }

  getUsers = (searchTerm) => {
    //trigger search after a timeout, so not every keypress leads to a search
    clearTimeout(timeout);
    timeout = setTimeout(()=>{
      axios.get(`${GIT_USER_SEARCH}${searchTerm}`)
      .then((response) => {
        // handle success
        const items = response.data.items;
        this.setState({displayItems: items})
        this.setState({selected: 0})
        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
    },500);

  }

  handleKeyPress = (event) => {
    const { key } = event;
    const itemCount = this.state.displayItems.length;
    console.log("itemcount: ", itemCount);
    const { selected } = this.state;
    if(key === "ArrowDown" || key === "ArrowUp")
    {
      let nextItemId = selected;  
      
      if(key === "ArrowDown"){
        nextItemId = nextItemId+1;
      }
      else
      {
        nextItemId = nextItemId-1;
      }
      if(nextItemId < itemCount && nextItemId >= 0){
        this.setState({selected: nextItemId})
      }
    }
    else if(key === "Enter"){
      window.location.href = `https://github.com/${this.state.displayItems[selected].login}`;
      //redirect to user profile
    }
  }

  handleChange = (event) => {
    const { value } = event.target;
    if(value !== this.state.searchTerm){
      console.log('handleChange')
      this.setState({ searchTerm: value });
      if(value.length > 2){
        this.getUsers(value);
      }else{
        this.setState({displayItems: []});
        this.setState({selected: 0});
      }
    }
    // console.log(`Typed:`, value);
  }

  renderItem = (item, i)=> {
    let className = `user-item ${i===this.state.selected ? 'selected':''}`
    console.log(className, i, this.state.selected);
    return (
      <div key={i} className={className}>
        <img className={"user-image"} src={item.avatar_url} alt={item.login} />
        <div className={"name"}>
          {item.login}
        </div>
      </div>
    )
  };
  render() {
    const { searchTerm } = this.state;
    let classNames = ["search-entries"];
    classNames = classNames.concat(["empty"]);
    return (
      <div className={"search-bar"} onKeyUp={this.handleKeyPress.bind(this)}>
        <input type="text" value={searchTerm} onChange={this.handleChange.bind(this)} ref={(input) => { this.nameInput = input; }}/>
        <div className={classNames.join(' ')}>{this.state.displayItems.map((item, i) => this.renderItem(item, i))}</div>
      </div>
    );
  }
}