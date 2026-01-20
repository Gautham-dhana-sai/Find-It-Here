import Carousel from "../Common/Carousel"
import InfiniteBox from "../Common/Infinite-Box"
import LocationBox from "../Common/Location-Box"
import SearchBox from "../Common/Search-Box"
import Dock from "./Dock"
import Items from "./Items"

const HomePage = () => {

    const userLocationData = () => {

    }
    
    return (
        <>
            <LocationBox data={location} triggerLocation={userLocationData}></LocationBox>
            <SearchBox></SearchBox>
            <Carousel></Carousel>
            <InfiniteBox>
                <Items></Items>
            </InfiniteBox>
            <Dock></Dock>
        </>
    )
}

export default HomePage