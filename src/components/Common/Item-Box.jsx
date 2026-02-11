import PropTypes from "prop-types";
import {capitalizeFirst} from "../../library/functions/string"
import { imagePath } from "../../library/functions/s3";
import { useEffect, useState } from "react";
// import noImage from '../../assets/no-image.jpg'

const ItemBox = ({item}) => {
  const noImage = '/no-image.jpg'
  // const noImage = 'src/assets/no-image.jpg'
  const [imgSrc, setImgSrc] = useState(noImage);

  useEffect(() => {
    let mounted = true;
    if (!item || !item.imageName) {
      setImgSrc(noImage);
      return;
    }

    (async () => {
      try {
        const path = await imagePath('items', item.imageName);
        if (mounted) setImgSrc(path || noImage);
      } catch (error) {
        console.error('Error loading image:', error);
        if (mounted) setImgSrc(noImage);
      }
    })();

    return () => { mounted = false; };
  }, [item?.imageName]);
  
  return (
    <>
      <div className="card-wrapper box">
        <div className="card">
          <img src={imgSrc} alt={noImage} loading="lazy"></img>
          <strong className="m-left-5 m-top-ne8 title-block">{capitalizeFirst(item.itemName)}</strong>
          <div className="m-left-5 statement-block"><strong>Store:</strong> {capitalizeFirst(item.store)}</div>
          <div className="m-left-5 statement-block">{capitalizeFirst(item.description)}</div>
        </div>
      </div>
    </>
  );
};

ItemBox.propTypes = {
  item: PropTypes.shape({
    itemName: PropTypes.string,
    store: PropTypes.string,
    description: PropTypes.string,
    imageName: PropTypes.string
  }),
}

export default ItemBox;
