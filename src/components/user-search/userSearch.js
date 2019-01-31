import React from 'react';
import './styles.css';


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



  handleKeyPress = (event) => {
    const { key } = event;
    const { displayItems } = this.state;
    const itemCount = displayItems.length;
    //debugger;
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
      //check if an item is selected and available

      //redirect to user profile
      this.openProfile(this.state.selected);
    }
  }

  openProfile = (selected) => {
    window.location.href = `https://github.com/${this.state.displayItems[selected].login}`;
  }

  handleMouseEnter(index){
    console.log('mouseEnter: ', index);
    this.setState({selected: index});
  }

  handleChange = (event) => {
    const { getData } = this.props;
    const { value } = event.target;
    if(value !== this.state.searchTerm){
      console.log('handleChange')
      this.setState({ searchTerm: value });
      if(value.length > 2){
            //trigger search after a timeout, so not every keypress leads to a search
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
          getData(this.state.searchTerm, (data) => {
            this.setState({displayItems: data});
          });
          this.setState({selected: 0})
        }, 500);
      }else{
        this.setState({displayItems: []});
        this.setState({selected: 0});
      }
    }
  }

  renderItem = (item, i, selected) => {
    const { renderContent } = this.props;
    let className = `user-item ${i===selected ? 'selected':''}`
    console.log(className, i, selected);
    return (
      <div key={i} className={className} onMouseEnter={() => this.handleMouseEnter(i)} onClick={() => this.openProfile(i)} >
        {renderContent(item)}
      </div>
    );
  }


  render() {
    const { searchTerm } = this.state;
    let classNames = ["search-entries"];
    classNames = classNames.concat(["empty"]);
    return (
      <div className={"search-bar"} onKeyUp={this.handleKeyPress.bind(this)}>
        <input type="text" value={searchTerm} onChange={this.handleChange.bind(this)} ref={(input) => { this.nameInput = input; }}/>
        <div className={classNames.join(' ')}>{this.state.displayItems.map((item, i) => this.renderItem(item, i, this.state.selected))}</div>
      </div>
    );
  }
}