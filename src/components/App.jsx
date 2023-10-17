import { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { Searchbar } from './Searchbar/Searchbar';
import { Container } from './App.styled';
import { fetchImages } from '../Api';
import { Loader } from './Loader/Loader';
import { notifyInfo, notifyInputQuerry, success } from './Notify/Notify';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
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

  changeQuery = newQuery => {
    this.setState({
      query: `${Date.now()}/${newQuery}`,
      images: [],
      page: 1,
    });
  };

  loadResult = async () => {
    const searchQuery = this.state.query;
    const nexPage = this.state.page;

    try {
      this.setState({ loading: true });
      const img = await fetchImages(searchQuery, nexPage);
      console.log(img);
      if (img.length) {
        this.setState(prevState => ({
          images: this.state.page > 1 ? [...prevState.images, ...img] : img,
        }));
        console.log(img);
        success(searchQuery);
        this.setState({ loading: false });
      } else {
        notifyInfo();
        this.setState({ loading: false });
      }
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleSubmit = evt => {
    console.log(evt.query);
    if (evt.query === '') {
      notifyInputQuerry();
      return;
    }
    console.log(evt);
    this.changeQuery(evt.query);
  };

  render() {
    const { loading, images } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />
        {/* { loading && <Loader /> } */}
        { images.length > 0 && <Gallery imgItems={ images } /> } 
        <Toaster position="top-center" reverseOrder={true} />
      </Container>
    );
  }
}
