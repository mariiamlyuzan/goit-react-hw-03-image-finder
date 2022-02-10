import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({ src, tags, onClick }) {
  return <img className={s.images} src={src} alt={tags} onClick={onClick} />;
}

export default ImageGalleryItem;
ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  tags: PropTypes.string,
  onClick: PropTypes.func,
};
