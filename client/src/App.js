import React, { Component } from 'react';
import CirriculumVitae from './CirriculumVitae';
import InputForm from './InputForm';
import './App.css';
import TitleHeader from './TitleHeader';
import Modal from 'react-modal';
import cvItemObject from './cvItemObject';

// === MODAL STUFF
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const apiUrl = 'http://localhost:9000/cvItems';

Modal.setAppElement('#root');

// END OF MODAL STUFF ===

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



  // ADD OBJECTS W MODAL

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

  componentDidMount = () => {
    this.updateItemList();
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

  render() {
    return (
      <div className='App' id='root'>
        <Modal 
          isOpen={this.state.modalOpen}
          style={customStyles}
          contentLabel={"Popup menu for entering a new CV Item"}
          onRequestClose={this.closeModal}
        > 
          <div className="modal-inner">
            <h2>
              Enter a New Item
            </h2>

            <InputForm 
              modalFormValue={this.state.modalFormValues}
              handleChange={this.handleModalFormChange}
            />

            <div className="buttons">
              <button onClick={this.addNewItem}>Enter this Item</button>
              <button onClick={this.closeModal}> X </button>
            </div>
          </div>
        </Modal>

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
