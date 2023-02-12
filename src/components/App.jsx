import ContactForm from './ContactForm/ContactForm';
import { Component } from 'react';
import { Filter } from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import Notification from './Notification/Notification';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = data => {
    const duplicate = this.state.contacts.some(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );
    if (duplicate) return alert(`${data.name} is already in contacts`);

    this.setState(prevState => ({
      contacts: [...prevState.contacts, { ...data, id: nanoid() }],
    }));
  };
  deleteTodo = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  handleChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };
  handleFilter = ({ target: { value } }) => {
    this.setState({ filter: value });
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;

    const filteredProducts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <>
        <h1>PhoneBook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        {contacts.length === 0 ? (
          <Notification message="There is no contacts" />
        ) : (
          <div>
            <Filter onFilterChange={this.handleFilter} value={filter} />

            <ContactList
              filteredProducts={filteredProducts}
              deleteTodo={this.deleteTodo}
            />
          </div>
        )}
      </>
    );
  }
}
