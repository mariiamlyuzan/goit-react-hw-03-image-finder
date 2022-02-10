import s from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ handleIncrement }) {
  return (
    <button className={s.button} type="button" onClick={handleIncrement}>
      Load more
    </button>
  );
}
Button.propTypes = {
  handleIncrement: PropTypes.func.isRequired,
};
