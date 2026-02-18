import { useEffect, useRef, useState } from "react"
import Carousel from "../Common/Carousel"
import InfiniteBox from "../Common/Infinite-Box"
import LocationBox from "../Common/Location-Box"
import SearchBox from "../Common/Search-Box"
import Dock from "./Dock"
import Items from "./Items"
import { ItemsService } from "../../library/services/items.service"

const HomePage = () => {
    const itemsService = new ItemsService()

    const [items, setItems] = useState([])
    const [location, setLocation] = useState({state: null, city: null})
    const [search, setSearch] = useState("")
    const [nextCursor, setNextCursor] = useState(null)
    const isFirstRender = useRef(true)

    useEffect(() => {
        if(isFirstRender.current) {
            isFirstRender.current = false
            return
        }
        getInitialItems()
    }, [location, search])

    const getInitialItems = async () => {
        const newItems = await getItems(null)
        setItems(newItems)
    }

    const getItems = async (cursor) => {
        const body = {
            paginationCursor: cursor,
            limit: 4,
            state: location?.state || null,
            city: location?.city || null,
            search: search || null
        }
        console.log("Request body at getItems", body)
        const response = await itemsService.getItemsPaginate(body)
        console.log("Response at getItems", response)
        if(response.success) {
            setNextCursor(response.nextCursor)
            return response.data
        } else {
            return []
        }
    }

    const fetchMoreItems = async () => {
        console.log('fetchMore triggered')
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
    
    return (
        <>
            <LocationBox data={location} triggerLocation={userLocationData}></LocationBox>
            <SearchBox triggerSearch={searchData}></SearchBox>
            <InfiniteBox dataLength={items.length} fetchMore={fetchMoreItems} hasMore={isFirstRender.current ? true : !!nextCursor}>
                <Carousel></Carousel>
                <Items items={items} loading={isFirstRender.current}></Items>
            </InfiniteBox>
            <Dock></Dock>
        </>
    )
}

export default HomePage