import PropTypes from "prop-types"
import BottomSheet from "../Common/Bottom-Sheet"
import HeaderTab from "../Common/Header-Tab"
import InfiniteBox from "../Common/Infinite-Box"
import ItemPreview from "../Common/ItemPreview"
import { useEffect, useState } from "react"

const ViewItem = ({ previewItem, triggerClose }) => {

    const [sheetOpen, setSheetOpen] = useState(false)

    useEffect(() => {
        setSheetOpen(true)
        console.log("Preview item at ViewItem", previewItem)
    }, [])

    const closeSheet = () => {
        setSheetOpen(false)
        triggerClose()
    }

    return (
        <>
            <BottomSheet open={sheetOpen} onClose={closeSheet}>
                    {
                    <InfiniteBox>
                            <HeaderTab header={previewItem.itemName} triggerClose={closeSheet} />
                            <ItemPreview item={previewItem} />
                    </InfiniteBox>
                    }
            </BottomSheet>
        </>
    )
}

ViewItem.propTypes = {
    previewItem: PropTypes.object,
    triggerClose: PropTypes.func
}

export default ViewItem

