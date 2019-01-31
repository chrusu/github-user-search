# UserSearch Component

## Usage

    <AutoComplete 
      renderContent={this.renderContent} 
      getData={this.getUsers} 
      searchName="Username:" 
      count={5}
    />

### Params
*renderContent* Callback-Function that defines the view of the content

*getData* Callback-Function that returns the data of the autocomplete

*searchName* Label-Text of the Search-Field

*count* How many items should be displayed max