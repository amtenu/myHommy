import { useState, useCallback } from "react";

import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";


// const photos = [
//   {
//     src: "https://myhommy-bucket.s3.ca-central-1.amazonaws.com/dnlUeznBaQlHUr8OQkO7g.jpeg",
//     width: 4,
//     height: 3,
//   },
//   {
//     src: "https://myhommy-bucket.s3.ca-central-1.amazonaws.com/dnlUeznBaQlHUr8OQkO7g.jpeg",
//     width: 1,
//     height: 1,
//   },
// ];

export default function ImageGallary({ photos }) {
  //The state

  // for modal of image
  const [current, setCurent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  

  //Hooks

  const openLightBox = useCallback((event, { photo, index }) => {
    setCurent(index);
    setIsOpen(true);
  }, []);

  const closeLightBox = () => {
    setCurent(0);
    setIsOpen(false);
  };

  return (
    <>
      <Gallery photos={photos} onClick={openLightBox} />
      <ModalGateway>
        {isOpen ? (
          <Modal onClose={closeLightBox}>
            <Carousel
              currentIndex={current}
              views={photos.map((x) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </>
  );
}
