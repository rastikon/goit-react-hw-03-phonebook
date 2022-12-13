import { Component } from "react";
import Form from "../Form/Form";
import "components/App/App.css";
import ContactsList from "../ContactList";
import Filter from "components/Filter";
import { nanoid } from "nanoid";

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  // Додає контакт до списку
  handleAddContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const { contacts } = this.state;
    const isExistContact = contacts.find((contact) =>
      contact.name.toLocaleLowerCase().includes(name.toLowerCase())
    );
    isExistContact
      ? alert("Contact is already exist")
      : this.setState(({ contacts }) => ({
          contacts: [contact, ...contacts],
        }));
  };

  // Видаляє контакту
  handleRemoveContact = (id) =>
    this.setState(({ contacts }) => ({
      contacts: contacts.filter((contact) => contact.id !== id),
    }));

  // Обробник для фільтрації контактів
  handleFilterChange = (filter) => this.setState({ filter });

  // Метод для фільтрації контактів
  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts)); //Записуєтсья в localStorage
    }
  }

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    // console.log(parsedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div className="form">
        <h2>Phonebook</h2>
        <Form onAdd={this.handleAddContact} />
        <h2>Contacts List</h2>
        <Filter filter={filter} onChange={this.handleFilterChange} />
        <ContactsList
          contacts={visibleContacts}
          onRemove={this.handleRemoveContact}
        />
      </div>
    );
  }
}
