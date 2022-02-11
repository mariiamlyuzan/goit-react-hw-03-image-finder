import { Component } from 'react';
import './App.css';
import Searchbar from './components/Searchbar';
import fetchImages from './services/images-api';
import ImageGallery from './components/ImageGallery';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MutatingDots } from 'react-loader-spinner';
import Button from './components/Button';
import Modal from './components/Modal';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
export default class App extends Component {
  state = {
    imageName: '',
    images: [],
    error: null,
    status: Status.IDLE,
    page: 1,
    loadEnd: false,
    message: '',
    showModal: false,
    url: '',
    tags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });

      fetchImages(nextName, nextPage)
        .then(images => {
          this.setState(prevState => {
            return {
              images: [...prevState.images, ...images.hits],
              status: Status.RESOLVED,
              loadEnd: true,
            };
          });
          const endPage = images.totalHits / images.hits.length;
          if (images.hits.length === 0) {
            this.setState({ loadEnd: false });
            toast.error(
              'Sorry, there are no images matching your search query. Please try again.',
            );
          }

          if (nextPage === endPage) {
            this.setState({ loadEnd: false });
            toast.error(
              `We're sorry, but you've reached the end of search results.`,
            );
          }
        })
        .catch(error => this.setState({ message: 'Enter correct name.' }));
    }
  }

  loadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  handleFormSubmit = imageName => {
    this.setState({ imageName, images: [] });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleClick = (url, tags) => {
    this.setState({ url, tags });
    this.toggleModal();
  };

  render() {
    const { status, images, message, loadEnd, showModal, url, tags } =
      this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'idle' && <p>Enter name.</p>}
        {status === 'pending' && (
          <MutatingDots
            color="#00BFFF"
            height={80}
            width={80}
            ariaLabel="loading"
          />
        )}
        {status === 'rejected' && <div>{message}</div>}
        {status === 'resolved' && (
          <ImageGallery
            images={images}
            tags={tags}
            onClick={this.handleClick}
          />
        )}
        {loadEnd && (
          <>
            <ImageGallery
              images={images}
              tags={tags}
              onClick={this.handleClick}
            />
            <Button handleIncrement={this.loadMoreBtn} />
          </>
        )}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img className="imageLarge" alt={tags} src={url} />
          </Modal>
        )}
      </>
    );
  }
}
