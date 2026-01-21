import HeaderTab from "../Common/Header-Tab"
import InfiniteBox from "../Common/Infinite-Box"
import QuoteBox from "../imports/Quote-Box"

import "../../styles/allignment.css"
import ThreeHoverTabs from "../imports/3-Hover-Tabs"

const Support = () => {
    return (
        <>
        <div>
            <InfiniteBox>
                <HeaderTab header={'Support'} route={'/'}></HeaderTab>
                <QuoteBox></QuoteBox>
                <ThreeHoverTabs></ThreeHoverTabs>
            </InfiniteBox>
        </div>
        </>
    )
}

export default Support