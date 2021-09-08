import "./App.css";
import { useState, useEffect } from "react";
import { uuid } from "uuidv4";
import AddContact from "./AddContact";

import ContactList from "./ContactList";
import Header from "./Header";

function App() {
  const LocalStorageKey = "contacts";
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => contact.id !== id);

    setContacts(newContactList);
  };

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LocalStorageKey));
    if (retriveContacts) setContacts(retriveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LocalStorageKey, JSON.stringify(contacts));
  }, [contacts]);

  console.log(contacts);
  return (
    <div className="ui container">
      <Header />
      <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} getContactId={removeContactHandler} />
    </div>
  );
}
export default App;
