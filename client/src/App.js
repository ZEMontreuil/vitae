import React, { Component } from 'react';
import CirriculumVitae from './CirriculumVitae';
import InputForm from './InputForm';
import './App.css';
import TitleHeader from './TitleHeader';
import Modal from 'react-modal';
import cvItemObject from './cvItemObject';
import CVItem from './CVItem';

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

  // DELETE OBJECTS

  handleDelete = (id) => {
    const itemsCopy = this.state.items.slice();

    const itemDeletionIndex = this.getItemIndex(id, itemsCopy);
    itemsCopy.splice(itemDeletionIndex, 1);

    this.setState({items: itemsCopy});
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

  addNewItem = () => {
    let newCvItem = new cvItemObject(this.state.items.length, 
      this.state.modalFormValues.name, 
      this.state.modalFormValues.description);

    const itemsCopy = this.state.items.slice();
    itemsCopy.push(newCvItem);

    this.setState({items: itemsCopy,
      modalFormValues: {
        name: '',
        description: ''
      }
    });

    this.closeModal();
  }

  closeModal = () => {
    this.setState({modalOpen: false});
  }

  async getCvList () {
    let response = await fetch('http://localhost:9000/cvItems');
    response = await response.json();
    
    return response;
  }

  async componentDidMount () {
    let fetchedList = await this.getCvList();
    
    let itemList = [];

    fetchedList.forEach(e => {
      itemList.push(new cvItemObject(e['Id'], e['Title'], e['Description']));
    });

    this.setState({items:itemList});
  }

  render() {
    return (
      <div className='App' id='root'>
        
        {/* TEST MYSQL */}
        <button onClick={this.getDBStuff}>
          GET
        </button>

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
