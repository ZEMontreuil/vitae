import React, { Component } from 'react';
import CirriculumVitae from './CirriculumVitae';
import './App.css';
import TitleHeader from './TitleHeader';

import ModalComponent from './ModalComponent';
import cvItemObject from './cvItemObject';

const apiUrl = 'http://localhost:9000/cvItems';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      addModalOpen: false,
      editModalOpen: false,
      currentlyEditing: 0,
    }

    // this is necessary for async methods, since they will not accept arrow functions directly
    this.getCvList = this.getCvList.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.updateItemList = this.updateItemList.bind(this);
  }

  // GET Item index by ID
  getItemIndex = (id, array) => {
    return array.indexOf(array.find(i => i.id === id));
  }

  // TOGGLE DESCRIPTION
  toggleDescription = (id) => {
    const itemsCopy = this.state.items.slice();

    const itemToggleIndex = this.getItemIndex(id, itemsCopy);
    itemsCopy[itemToggleIndex].descriptionOpened = !itemsCopy[itemToggleIndex].descriptionOpened;

    this.setState({items: itemsCopy})
  }

  // ADD OBJECTS W MODAL and HANDLE MODAL BEHAVIOUR



  // === POST AN ITEM
  handleAddClick = () => {
    this.setState({addModalOpen: true});
  }

  async postNewItem (newItem) {
    await fetch (apiUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    });

    await this.updateItemList();
    this.closeModal();
  }

  addNewItem = (newTitle, newDescription) => {
    this.postNewItem({Title: newTitle, Description: newDescription});
    this.closeModal();
  };

  // === EDIT AN ITEM ===

  handleEditClick = id => {
    this.setState({editModalOpen : true, currentlyEditing: id});
  }

  async requestEditItem (itemId, newItem) {
    await fetch(`${apiUrl}/itemId/${itemId}`, {
      method: `PATCH`,
      mode: `cors`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    });

    await this.updateItemList();
    this.closeModal();
  }

  editItem = (newTitle, newDescription) => {
    this.requestEditItem(this.state.currentlyEditing, {Title: newTitle, Description: newDescription});
  }
  

  closeModal = () => {
    this.setState({addModalOpen: false, editModalOpen: false, currentlyEditing: 0});
  }

  async getCvList () {
    let response = await fetch(apiUrl);
    response = await response.json();
    
    return response;
  }

  async updateItemList () {
    let fetchedList = await this.getCvList();
    let newList = [];

    fetchedList.forEach(fetchedItem => {
      newList.push(new cvItemObject(fetchedItem['Id'], 
        fetchedItem['Title'], 
        fetchedItem['Description']));
    });

    this.setState({items:newList});
  }

  // DELETE OBJECTS
  async handleDelete (id) {
    await fetch(apiUrl + '/itemId/' + id, {
      method: 'DELETE'
    });

    this.updateItemList();
  }

  // ONLOAD
  componentDidMount = () => {
    this.updateItemList();
  }

  render() {
    let modal;

    if (this.state.addModalOpen) {
      modal = <ModalComponent 
        label="Popup Menu for entering a CV Item"
        requestClose={this.closeModal}
        headerText="Create New CV Item"

        handleSubmit={this.addNewItem}
        handleExit={this.closeModal}
      />
    } else if (this.state.editModalOpen) {
      modal = <ModalComponent 
      label="Popup Menu for editing a CV Item"
      requestClose={this.closeModal}
      headerText="Edit CV Item"
      
      // change to editing item
      editingItem={this.state.items.find(i => i.id === this.state.currentlyEditing)}
      handleSubmit={this.editItem}
      handleExit={this.closeModal}
    />
    }
    else {
      modal = '';
    }

    return (
      <div className='App' id='root'>
        {modal}
        <TitleHeader />
        <CirriculumVitae 
          items={this.state.items} 
          handleEditClick={this.handleEditClick}
          handleDelete={this.handleDelete}
          handleDescriptionClick={this.toggleDescription}  
        />
          
        <button 
          className="add-item"
          onClick={this.handleAddClick}>
          +
        </button>
      </div>
    );
  }
}

export default App;