import PropTypes from 'prop-types';
import { Button } from 'components/Button/Button';
export const ContactItem = ({ name, number, id, deleteContact }) => {
  return (
    <>
      <li style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p style={{ fontSize: '16px' }}> {name}</p>
        <p style={{ fontSize: '16px' }}> {number}</p>
        <Button onClick={() => deleteContact(id)}>Delete</Button>
      </li>
    </>
  );
};
ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
