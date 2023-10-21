import { Component } from 'react';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import { ImageGalleryItemImg } from './ImageGalleryItem.styled';

export class GalleryImage extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    console.log('object');
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props.item;
    const { isModalOpen } = this.state;
    return (
      <div>
        <ImageGalleryItemImg
          src={webformatURL}
          alt={tags}
          load="lazy"
          onClick={this.toggleModal}
        />

        <ModalWindow
          isOpen={isModalOpen}
          onRequestClose={this.toggleModal}
          largeImageURL={largeImageURL}
          tags={tags}
        >
          {/* <img src={largeImageURL} alt={tags} /> */}
        </ModalWindow>
      </div>
    );
  }
}
