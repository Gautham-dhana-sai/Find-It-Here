import { useEffect, useState } from "react"
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

    useEffect(() => {
        getItems()
    }, [location, search])

    const getItems = async () => {
        const body = {
            paginationCursor: null,
            limit: 4,
            state: location?.state || null,
            city: location?.city || null,
            search: search || null
        }
        console.log("Request body at getItems", body)
        const response = await itemsService.getItemsPaginate(body)
        if(response.success) setItems(response.data)
        else setItems([])
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
            <Carousel></Carousel>
            <InfiniteBox>
                <Items items={items}></Items>
            </InfiniteBox>
            <Dock></Dock>
        </>
    )
}

export default HomePage