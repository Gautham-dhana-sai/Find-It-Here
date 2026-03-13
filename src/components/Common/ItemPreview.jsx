import PropTypes from 'prop-types'
import '../../styles/components/item-preview.css'
import { capitalizeFirst } from '../../library/functions/string'
import { useEffect, useRef, useState } from 'react'
import { imagePath } from '../../library/functions/s3'
import { ProfileService } from '../../library/services/profile.service'

const ItemPreview = ({ item }) => {
    const noImage = '/no-image.jpg'
    const [imgSrc, setImgSrc] = useState(noImage);
    const [editor, setEditor] = useState(null)
    const profileServiceRef = useRef(new ProfileService())
    

    useEffect(() => {
      (async () => {
        try {
          const path = await imagePath('items', item.imageName);
          setImgSrc(path);
        } catch (error) {
          console.error('Error loading image:', error);
          setImgSrc(noImage);
        }
      })();

      (async() => {
        await getEditorData(item.addedBy)
      })()
    }, []);

    const getEditorData = async (userId) => {
      const userData = await profileServiceRef.current.getProfileData({userId})
      if(userData && userData.success) setEditor(userData.data)
    }

  return (
    <div className="item-preview">
      <div className="preview-left">
        <div className="preview-image">
          <img src={imgSrc} alt={noImage} />
        </div>
      </div>
      <div className="preview-right">
        <h2 className="preview-title">{capitalizeFirst(item.itemName)}</h2>
        <p className="preview-desc">{item.description}</p>
        <div className="preview-meta">
          <span className="meta-pill">Category: {item.category?.name || 'General'}</span>
          <span className="meta-pill">Brand: {item.brand?.name || 'Unknown'}</span>
        </div>

        <div className="preview-stats">
          <div className="rating">★ ★ ★ ★ ☆ <span className="rating-value">4.0</span></div>
          <div className="likes">❤ <span className="likes-count">{item.likes || 0}</span></div>
        </div>

        <div className="store-block">
          <div className="store-name">Store: <strong>{item.store || 'Unknown Store'}</strong></div>
          <div className="store-address">{item.address || 'No address provided'}</div>
          <div className="store-location">{item.city || ''} {item.state ? ', ' + item.state : ''} {item.pincode ? '- ' + item.pincode : ''}</div>
        </div>

        <div className="added-by">
          <img className="added-avatar" src={editor?.avatar || '/no-avatar.png'} alt="added by" />
          <div className="added-info">
            <div className="added-email">{editor?.username || 'Editor'}</div>
            <div className="added-note">{editor?.email || 'user@example.com'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

ItemPreview.propTypes = {
  item: PropTypes.object
}

export default ItemPreview
