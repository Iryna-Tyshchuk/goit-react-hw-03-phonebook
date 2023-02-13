import PropTypes from 'prop-types';
import { Input } from '../Input/Input';
export const Filter = ({ value, onFilterChange }) => {
  return (
    <div style={{ margin: '20px auto', width: '500px' }}>
      <p style={{ fontSize: '32px' }}>Find contact by name</p>
      <Input
        type="text"
        name="filter"
        value={value}
        onChange={onFilterChange}
      />
    </div>
  );
};
Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
