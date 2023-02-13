import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm.jsx/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { GlobalStyle } from '../GlobalStyle';

export default class App extends Component {
  state = {
    contacts: JSON.parse(localStorage.getItem('contacts')) ?? [],
    filter: '',
  };
  // componentDidMount() {
  //   const contacts = JSON.parse(localStorage.getItem('contacts'));
  //   if (contacts) {
  //     this.setState({
  //       contacts: JSON.parse(localStorage.getItem('contacts')),
  //     });
  //   }
  // }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      const stringifiedContacts = JSON.stringify(this.state.contacts);

      localStorage.setItem('contacts', stringifiedContacts);
    }
  }

  addContact = contact => {
    const isInContacts = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      alert(`Contact ${contact.name} is already exists!`);
      return false;
    }

    const newContact = {
      ...contact,
      id: nanoid(),
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
    return true;
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  handleFilter = ({ target: { value } }) => {
    this.setState({
      filter: value,
    });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) =>
      name.toLowerCase().trim().includes(filter.toLowerCase())
    );
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <div>
          <h1 style={{ fontSize: '32px' }}>Phone book</h1>
          <ContactForm addContact={this.addContact} />

          <h2 style={{ fontSize: '32px' }}>Contacts</h2>

          {contacts.length !== 0 ? (
            <>
              <Filter onFilterChange={this.handleFilter} value={filter} />
              <ContactList
                contacts={filteredContacts}
                deleteContact={this.deleteContact}
              />
            </>
          ) : (
            <p>You haven't any contacts</p>
          )}
        </div>
        <GlobalStyle />
      </div>
    );
  }
}
