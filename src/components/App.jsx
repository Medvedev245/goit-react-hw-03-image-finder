import { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { Searchbar } from './Searchbar/Searchbar';
import { Container } from './App.styled';
import { fetchImages } from '../Api';
import { Pagination } from './LoadMore/LoadMore';
import { Loader } from './Loader/Loader';
import { notifyInfo, notifyInputQuerry, success } from './Notify/Notify';
import { Gallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    isEmpty: true,
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const prevQuery = prevState.query;
    const searchQuery = this.state.query;
    const prevPage = prevState.page;
    const nexPage = this.state.page;

    if (prevQuery !== searchQuery || prevPage !== nexPage) {
      this.loadResult();
    }
  };

  loadResult = async () => {
    const { query, page } = this.state;
    if (query) {
      this.setState({ isEmpty: false });
    }

    try {
      this.setState({ loading: true });
      const img = await fetchImages(query, page);
      if (this.state.isEmpty) {
        notifyInfo();
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...img],
        }));
        success(query);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleSubmit = evt => {
    if (evt.query === '') {
      notifyInputQuerry();

      return;
    }
    this.setState({
      query: evt.query,
      images: [],
      page: 1,
    });
  };

  render() {
    const { loading, images, isEmpty } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />
        {loading && <Loader />}
        {!isEmpty && <Gallery imgItems={images} />}
        {images.length > 11 && (
          <Pagination onClick={this.handleLoadMore}>Load More</Pagination>
        )}
        <Toaster position="top-center" reverseOrder={true} />
      </Container>
    );
  }
}
