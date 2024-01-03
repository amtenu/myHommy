import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

const photos = [
  {
    src: "https://myhommy-bucket.s3.ca-central-1.amazonaws.com/dnlUeznBaQlHUr8OQkO7g.jpeg",
    width: 4,
    height: 3,
  },
  {
    src: "https://myhommy-bucket.s3.ca-central-1.amazonaws.com/dnlUeznBaQlHUr8OQkO7g.jpeg",
    width: 1,
    height: 1,
  },
];

export default function AdView() {
  //The state

  const [ad, setAd] = useState({});
  const [related, setRelated] = useState([]);

  // for modal of image
  const [current, setCurent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  //Hooks

  const params = useParams();

  useEffect(() => {
    if (params?.slug) fetchAd();
  }, [params?.slug]);

  const fetchAd = async () => {
    try {
      const { data } = await axios.get(`/ad/${params.slug}`);
      setAd(data?.ad);
      setRelated(data?.related);
    } catch (err) {
      console.log(err);
    }
  };

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
      <pre>{JSON.stringify({ ad, related }, null, 4)}</pre>
    </>
  );
}
