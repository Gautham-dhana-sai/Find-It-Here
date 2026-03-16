import { useEffect, useRef, useState, useCallback } from "react"
import Carousel from "../Common/Carousel"
import InfiniteBox from "../Common/Infinite-Box"
import LocationBox from "../Common/Location-Box"
import SearchBox from "../Common/Search-Box"
import Dock from "./Dock"
import Items from "./Items"
import { ItemsService } from "../../library/services/items.service"
import ViewItem from "../Tabs/View-Item"

const HomePage = () => {
    const itemsServiceRef = useRef(new ItemsService())

    const [items, setItems] = useState([])
    const [location, setLocation] = useState({state: null, city: null})
    const [search, setSearch] = useState("")
    const [nextCursor, setNextCursor] = useState(null)
    const isFirstRender = useRef(true)
    const [previewItem, setPreviewItem] = useState(null)
    const [sheetOpen, setSheetOpen] = useState(false)
    const [loader, setLoader] = useState(true)

    // get items (stable reference)
    const getItems = useCallback(async (cursor) => {
        const body = {
            paginationCursor: cursor,
            limit: 10,
            state: location?.state || null,
            city: location?.city || null,
            search: search || null
        }
        const response = await itemsServiceRef.current.getItemsPaginate(body)
        setLoader(false)
        if(response && response.success) {
            setNextCursor(response.nextCursor)
            return response.data
        } else {
            return []
        }
    }, [location, search, itemsServiceRef])

    const getInitialItems = useCallback(async () => {
        const newItems = await getItems(null)
        setItems(newItems)
    }, [getItems])

    // initial load on mount / when location or search change (skip first render)
    useEffect(() => {
        if(isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        getInitialItems()
    }, [getInitialItems])

    const fetchMoreItems = async () => {
        if(!nextCursor && items.length) return
        const newItems = await getItems(nextCursor)
        setItems((prev) => [
            ...prev,
            ...newItems
        ])
    }

    const userLocationData = (data) => {
        setLocation(data || {state: null, city: null})
    }

    const searchData = (data) => {
        setSearch(data)
    }

    const openItemPreview = (item) => {
        getItemData(item._id)
        setSheetOpen(true)
    }

    const closeSheet = () => {
        setSheetOpen(false)
        setPreviewItem(null)
    }

    const getItemData = async (itemId) => {   
    const itemData = await itemsServiceRef.current.getItemData({itemId})
        if(itemData && itemData.success) {
            setPreviewItem(itemData.data)
        } else {
            setPreviewItem(null)
        }
    }
    
    return (
        <>
            <LocationBox data={location} triggerLocation={userLocationData}></LocationBox>
            <SearchBox triggerSearch={searchData}></SearchBox>
            <InfiniteBox dataLength={items.length} fetchMore={fetchMoreItems} hasMore={isFirstRender.current ? true : !!nextCursor}>
                <Carousel />
                <Items items={items} loading={loader} onItemClick={openItemPreview} />
            </InfiniteBox>
            {!sheetOpen && <Dock />}
            {sheetOpen && previewItem && (
                <ViewItem previewItem={previewItem} triggerClose={closeSheet} />
            )}
        </>
    )
}

export default HomePage