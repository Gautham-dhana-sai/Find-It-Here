import PropTypes from "prop-types"
import InfiniteScroll from "react-infinite-scroll-component"

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
                        height={400}
                        loader={<h4>Loading...</h4>}
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