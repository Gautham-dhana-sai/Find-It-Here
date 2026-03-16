import PropTypes from "prop-types"
import InfiniteScroll from "react-infinite-scroll-component"
import PendulumLoader from "../imports/Pendulum-Loader"

const InfiniteBox = ({children, fetchMore, hasMore, dataLength}) => {

    const fetchMoreData = () => {
        fetchMore?.()
    }

    return (
        <>
            <section className="infinite-box">
                {(fetchMore 
                    && <InfiniteScroll
                        next={fetchMoreData}
                        dataLength={dataLength}
                        hasMore={hasMore}
                        loader={<PendulumLoader />}
                    >
                        {children}
                    </InfiniteScroll>)
                    || children
                } 
            </section>
        </>
    )
}

InfiniteBox.propTypes = {
    children: PropTypes.node,
    fetchMore: PropTypes.func,
    hasMore: PropTypes.bool,
    dataLength: PropTypes.number
}

export default InfiniteBox