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
      modalOpen: false,
      modalFormValues: {
        name: '',
        description: '',
      }
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
  handleAddClick = () => {
    this.setState({modalOpen: true});
  }

  handleModalFormChange = (event) => {
    let modalItems = this.state.modalFormValues;
    modalItems[event.target.id] = event.target.value;

    this.setState({modalFormValues: modalItems});
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

  addNewItem = () => {
    let Title = this.state.modalFormValues.name;
    let Description = this.state.modalFormValues.description;
    
    this.postNewItem({Title, Description});

    this.setState({modalFormValues: {
      name: '',
      description: '',
    }});
  }

  closeModal = () => {
    this.setState({modalOpen: false, 
      modalFormValues: {
        name: '',
        description: '',
    }});
  }

  // GET AND UPDATE CV ITEMS FROM API
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

    if (this.state.modalOpen) {
      modal = <ModalComponent 
        label="Popup Menu for entering a new CV Item"
        requestClose={this.closeModal}
        headerText="Enter a new CV Item"

        formValue={this.state.modalFormValues}
        handleChange={this.handleModalFormChange}

        handleSubmit={this.addNewItem}
        handleExit={this.closeModal}
      />
    } else {
      modal = '';
    }

    return (
      <div className='App' id='root'>
        {modal}
        <TitleHeader />
        <CirriculumVitae 
          items={this.state.items} 
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