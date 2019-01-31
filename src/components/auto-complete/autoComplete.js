import React from 'react';
import './styles.css';
import { calculateNextItemId } from './autoCompleteHelper';

let timeout;

export default class AutoComplete extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      selected: 0,
      searchTerm: '',
      displayItems: [],
      errorMessage: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount(){
    this.searchInput.focus();
  }

  // handles the keypresses in the input-field
  handleKeyPress = (event) => {
    const { key } = event;
    const { displayItems } = this.state;
    const itemCount = displayItems.length;
    const { selected } = this.state;

    // handle arrow-keys, calculate id of next item
    if(key === "ArrowDown" || key === "ArrowUp")
    {
      const nextItemId = calculateNextItemId(selected, key, itemCount)

      // select new item
      this.setState({selected: nextItemId})
      
    }
    else if(key === "Enter"){
      // check if an item is selected and available
      // redirect to user profile
      this.openProfile(this.state.selected);
    }
  }

  // open the selected github-profile
  openProfile = (selected) => {
    window.location.href = `https://github.com/${this.state.displayItems[selected].login}`;
  }

  // focus the item, if mouse enters
  handleMouseEnter(index){
    this.setState({selected: index});
  }

  // handle the changes the user causes in the input-field
  handleChange = (event) => {
    const { getData, count = 10 } = this.props;
    const { value } = event.target;

    // cancel any request, if the user types more into the searchfield
    clearTimeout(timeout);

    // the search-term has changed
    if(value !== this.state.searchTerm){
      this.setState({ searchTerm: value });

      // if 3 or more characters are in input-field, search for users
      if(value.length > 2){
        // trigger search after a timeout, so not every keypress leads to a search
        timeout = setTimeout(()=>{
          // get the data from the passed by data-function
          getData(this.state.searchTerm, (data) => {
            // handle success
            this.setState({displayItems: data.slice(0,count)});
            this.setState({errorMessage: ''});
            this.setState({seleted: 0});
          }, (errorMessage)=> {
            // handle errors
            this.setState({errorMessage: errorMessage});
            this.setState({displayItems: []});
            this.setState({selected: 0});
          });
          this.setState({selected: 0});
        }, 500);
      }else{
        // reset the state, if less than 2 chars are typed in the input
        this.setState({displayItems: []});
        this.setState({selected: 0});
        this.setState({errorMessage: ''});
      }
    }
  }

  // render the search-result in autocomplete using the renderContent-function passed via props 
  renderItem = (item, i, selected) => {
    const { renderContent } = this.props;
    let className = `autocomplete-item ${i===selected ? 'selected':''}`

    return (
      <div key={i} className={className} onMouseEnter={() => this.handleMouseEnter(i)} onClick={() => this.openProfile(i)} >
        {renderContent(item)}
      </div>
    );
  }

  // render function
  render() {
    const { searchTerm } = this.state;

    return (
      <div>
        <div className={"search-bar"} onKeyUp={this.handleKeyPress.bind(this)}>
          <label htmlFor="searchfield">{this.props.searchName}</label>
          <form autoComplete="off">
          <input type="text" id="searchfield" value={searchTerm} onChange={this.handleChange.bind(this)} ref={(input) => { this.searchInput = input; }}/>
          </form>
          <div className={"search-entries"}>{this.state.displayItems.map((item, i) => this.renderItem(item, i, this.state.selected))}</div>
        <div className={"error"}>{this.state.errorMessage}</div>
        </div>
      </div>
    );
  }
}