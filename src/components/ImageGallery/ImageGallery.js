import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';
function ImageGallery({ images, onClick }) {
  return (
    <ul className={s.gallery}>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <li className={s.photo} key={id}>
          <ImageGalleryItem
            onClick={() => onClick(largeImageURL)}
            src={webformatURL}
            alt={tags}
          />
        </li>
      ))}
    </ul>
  );
}

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.array,
  onClick: PropTypes.func,
};
