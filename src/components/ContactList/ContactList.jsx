import css from './ContactList.module.css';
import PropTypes from 'prop-types';

const ContactList = ({ filteredProducts, deleteTodo }) => {
  return (
    <ul className={css.list}>
      {filteredProducts.map(contact => {
        return (
          <li key={contact.id}>
            {contact.name} {contact.number}
            <button
              className={css.button}
              type="button"
              onClick={() => deleteTodo(contact.id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};
export default ContactList;

ContactList.propTypes = {
  filteredProducts: PropTypes.array.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
