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
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount(){
    this.nameInput.focus();
  }



  handleKeyPress = (event) => {
    const { key } = event;
    const { data } = this.props;
    const itemCount = data.length;
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
      this.props.handleEnter(this.props.data[this.state.selected].login);
      //redirect to user profile
    }
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
          getData(this.state.searchTerm);
          this.setState({selected: 0})
        }, 500);
      }else{
        this.setState({displayItems: []});
        this.setState({selected: 0});
      }
    }
  }



  render() {
    const { searchTerm } = this.state;
    const { data, renderItem } = this.props;
    let classNames = ["search-entries"];
    classNames = classNames.concat(["empty"]);
    return (
      <div className={"search-bar"} onKeyUp={this.handleKeyPress.bind(this)}>
        <input type="text" value={searchTerm} onChange={this.handleChange.bind(this)} ref={(input) => { this.nameInput = input; }}/>
        <div className={classNames.join(' ')}>{data.map((item, i) => renderItem(item, i, this.state.selected))}</div>
      </div>
    );
  }
}