import { useState } from "react"
import HeaderTab from "../Common/Header-Tab"
import InfiniteBox from "../Common/Infinite-Box"
import SingleSelectDropdown from "../Common/Single-Select-Dropdown"
import LocationBox from "../Common/Location-Box"
import ImageInput from "../imports/Image-Input"
import SaveButton from "../imports/Save-Button"
import ResetButton from "../imports/Reset-Button"
import { ItemsService } from "../../library/services/items.service"
import PopUpModal from "../Common/PopUp-Modal"

const AddItemForm = () => {

    const itemsService = new ItemsService()

    const loadingModal = {
        title: 'Loading',
        hide_close: true,
        hide_submit: true,
        context: 'Saving In Progress'
    }

    const failedModal = {
        title: 'Failed',
        hide_submit: true,
        context: 'Saving failed due to some reason',
        close_context: 'Close',
    }

    const successModal = {
        title: 'Success',
        hide_submit: true,
        context: 'Item saved successfully',
        close_context: 'Done'
    }

    const closeModal = () => {
        setOpenModal(false)
    }

    const doneModal = () => {
        setOpenModal(false)
        resetAll()
    }

    const [itemName, setItemName] = useState("")
    const [itemNameBlur, setItemNameBlur] = useState(false)
    const [store, setStore] = useState("")
    const [storeBlur, setStoreBlur] = useState(false)
    const [desc, setDesc] = useState("")
    const [descBlur, setDescBlur] = useState(false)
    const [address, setAddress] = useState("")
    const [addressBlur, setAddressBlur] = useState(false)
    const [pincode, setPincode] = useState("")
    const [pincodeBlur, setPincodeBlur] = useState(false)
    const [location, setLocation] = useState({state: null, city: null})
    const [image, setImage] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [modalData, setModalData] = useState(loadingModal)

    const userLocationData = (data) => {
        setLocation(data)
    }

    const resetClick = () => {
        resetAll()
    }

    const resetAll = () => {
        setItemName("")
        setItemNameBlur(false)
        setDesc("")
        setDescBlur(false)
        setAddress("")
        setAddressBlur(false)
        setPincode("")
        setPincodeBlur(false)
        setLocation({state: null, city: null})
        setStore("")
        setStoreBlur(false)
        setImage(null)
    }

    const saveclick = async () => {
        if(!(itemName && desc && address && pincode && location.city && location.state))
            return
        setModalData(loadingModal)
        setOpenModal(true)
        try {
            const body = {
                itemName,
                store,
                description: desc,
                address,
                pincode,
                category: null, 
                brand: null,
                state: location.state,
                city: location.city,
                uploadedBy: 'admin'
            }
            const formData = new FormData()
            formData.append('body', JSON.stringify(body))
            formData.append('file', image)
            const itemCreated = await itemsService.createItem(formData)
            console.log(itemCreated, 'response')
            setTimeout(() => {
                if(itemCreated.success) {
                    setModalData(successModal)
                } else {
                    setModalData(failedModal)
                }
            }, 1000)
        } catch (error) {
            console.log(error, 'Error at saving')
            setModalData(failedModal)
        }
    }

    const imageData = (data) => {
        setImage(data)
    }

    return (
        <>
            <div>
                <InfiniteBox>
                    <HeaderTab header="Add Item" route={'/'}></HeaderTab>
                    <form className="pad-5">
                        <div className="m-2 mb-3">
                            <input type="text" className="form-control" value={itemName} placeholder="Item Name"
                                onChange={(event) => {setItemName(event.target.value)}} onBlur={() => {setItemNameBlur(true)}}/>
                            <div className="">
                                {itemNameBlur && itemName.length === 0 && (<div className="form-text text-danger">Item name is required</div>)}
                                {itemNameBlur && itemName.length !== 0 && itemName.length < 4 && (<div className="form-text text-danger">Enter min 4 characters</div>)}
                            </div>
                        </div>
                        <div className="m-2 mb-3">
                            <input type="text" className="form-control" value={store} placeholder="Store Name"
                                onChange={(event) => {setStore(event.target.value)}} onBlur={() => {setStoreBlur(true)}}/>
                            <div className="">
                                {storeBlur && store.length === 0 && (<div className="form-text text-danger">Store name is required</div>)}
                                {itemNameBlur && store.length !== 0 && store.length < 4 && (<div className="form-text text-danger">Enter min 4 characters</div>)}
                            </div>
                        </div>
                        <div className="mb-3">
                            <LocationBox data={location} triggerLocation={userLocationData} required={true}></LocationBox>
                        </div>
                        <div className="mb-3">
                            <div className="strip-half">
                                <SingleSelectDropdown placeholder='Category'></SingleSelectDropdown>
                                <SingleSelectDropdown placeholder='Brand'></SingleSelectDropdown>
                            </div>
                        </div>
                        <div className="m-2 mb-3">
                            <textarea className="form-control" value={desc} placeholder="Description"
                                onChange={(event) => {setDesc(event.target.value)}} onBlur={() => {setDescBlur(true)}}/>
                            <div className="">
                                {descBlur && desc.length === 0 && (<div className="form-text text-danger">Description is required</div>)}
                                {descBlur && desc.length !== 0 && desc.length < 4 && (<div className="form-text text-danger">Enter min 4 characters</div>)}
                            </div>
                        </div>
                        <div className="m-2 mb-3">
                            <textarea className="form-control" value={address} placeholder="Address"
                                onChange={(event) => {setAddress(event.target.value)}} onBlur={() => {setAddressBlur(true)}}/>
                            <div className="">
                                {addressBlur && address.length === 0 && (<div className="form-text text-danger">Address is required</div>)}
                                {addressBlur && address.length !== 0 && address.length < 10 && (<div className="form-text text-danger">Enter min 10 characters</div>)}
                            </div>
                        </div>
                        <div className="m-2 mb-3">
                            <div className="col-md-6">
                                <input type="number" className="form-control" value={pincode} placeholder="Pincode"
                                    onChange={(event) => {setPincode(event.target.value)}} onBlur={() => {setPincodeBlur(true)}}/>
                                <div className="">
                                    {pincodeBlur && pincode.length === 0 && (<div className="form-text text-danger">Pincode is required</div>)}
                                    {pincodeBlur && pincode.length !== 6 && (<div className="form-text text-danger">Pincode should be 6 digits</div>)}
                                </div>
                            </div>
                        </div>
                        <div className="m-2 mb-3">
                            <div className="col-md-6">
                                <ImageInput sendFileData={imageData} patchFile={image}></ImageInput>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-5"></div>
                            <div className="col-md-3">
                                <ResetButton resetClick={resetClick}></ResetButton>
                            </div>
                            <div className="col-md-3">
                                <SaveButton saveClick={saveclick}></SaveButton>
                            </div>
                        </div>
                    </form>
                </InfiniteBox>
            </div>
            {openModal && <PopUpModal modal_data={modalData} close={modalData.title === 'Success' ? doneModal : closeModal}></PopUpModal>}
        </>
    )
}

export default AddItemForm