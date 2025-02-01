import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ContactList from './components/ContactList';
import { useState } from 'react';
import AddList from './components/AddList';
import {v4 as uuidv4} from 'uuid';
import EditContact from './components/EditContact';
import ViewContact from './components/ViewContact';
import Register from './components/Register';
import Login  from './components/Login';

function App() {
  let contactArray = [
    { 
      id:'1',
      name:"shivaraj Patil",
      email:"patilshivaraj65@gmail.com"
    },
    {
      id:'2',
      name:"Naitik Patel",
      email:"naitikpatel69@gmail.com"
    }
  ]
  console.log(contactArray);

  const [contacts, setContacts] = useState(contactArray);
  
  const onAddContact = (contact) =>{
    setContacts([...contacts, {id:uuidv4(), ...contact}]);
  }

  const onDeleteContact = (newContact)=>{
    setContacts(newContact);
  }

  const onEditContact = (contact) =>{
    
    const newContacts= contacts.map((c)=>{
      return c.id===contact.id ? contact:c;
    })
    console.log(contact);
    console.log('newContacts',newContacts);
    setContacts(newContacts);
  }
  
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ContactList contacts={contacts} onDeleteContact={onDeleteContact}/>} />
          <Route path="/add-contact" element={<AddList onAddContact={onAddContact}/>} />
          <Route path="/edit-contact/:id" element={<EditContact onEditContact={onEditContact}/> } />
          <Route path='/view-contact/:id' element={<ViewContact/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


