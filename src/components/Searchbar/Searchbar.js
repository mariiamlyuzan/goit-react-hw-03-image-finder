import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleNameChange = event => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.imageName.trim() === '') {
      toast.error('Please enter name image.');
      return;
    }

    this.props.onSubmit(this.state.imageName);
    this.setState({ imageName: '' });
  };

  render() {
    return (
      <>
        <header>
          <form className={s.searchForm} onSubmit={this.handleSubmit}>
            <button className={s.button} type="submit">
              <span>Search</span>
            </button>

            <input
              className={s.input}
              type="text"
              value={this.state.imageName}
              onChange={this.handleNameChange}
              placeholder="Search images and photos"
            />
          </form>
        </header>
        <ToastContainer autoClose={3000} position="top-center" />
      </>
    );
  }
}
