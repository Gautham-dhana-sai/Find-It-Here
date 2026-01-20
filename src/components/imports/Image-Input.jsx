import { useEffect, useState } from "react"
import "../../styles/components/image-input.css"
import PropTypes from "prop-types"

const ImageInput = ({sendFileData, patchFile}) => {

    const [image, setImage] = useState(null)

    const fileInput = (event) => {
        const file = event.target.files[0]
        console.log(file)
        if(!file) {
            setImage(null)
            return
        } else if (!file.type.includes("image") || !file.size > 1024 * 1024 ) return
        const imageUrl = URL.createObjectURL(file)
        setImage(imageUrl)
        sendFileData(file)
    }

    const removeFile = () => {
        setImage(null)
        sendFileData(null)
    }

    useEffect(() => {
        let imageUrl = null
        if(patchFile)
            imageUrl = URL.createObjectURL(patchFile)
        setImage(imageUrl)
    }, [patchFile])

    return (
        <>
            {!image ? 
            <div className="image-container">
                <div className="folder">
                    <div className="front-side">
                    <div className="tip"></div>
                    <div className="cover"></div>
                    </div>
                    <div className="back-side cover"></div>
                </div>
                <label className="custom-file-upload">
                    <input className="title" type="file" onChange={fileInput}/>
                    Choose file
                </label>
            </div>
            :   <div className="file-box">
                {/* <div className="preview-box">Image Preview</div> */}
                <img className="preview-box" src={image}/>
                <button className="remove-button" aria-label="Remove image" onClick={removeFile}>
                    <svg className="icon" fill="none" stroke="currentColor" strokeWidth="5" viewBox="0 0 24 24">
                        <path d="M18 6L6 18M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            }
        </>
    )
}

ImageInput.propTypes = {
    sendFileData: PropTypes.func,
    patchFile: PropTypes.object
}

export default ImageInput