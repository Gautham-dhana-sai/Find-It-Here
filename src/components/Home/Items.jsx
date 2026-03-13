import PropTypes from "prop-types"
import ItemBox from "../Common/Item-Box"
import { Empty } from "antd"

const Items = ({items, loading, onItemClick}) => {

    return (
        <> 
        {!loading && items.length 
            ? <section className="cards">
                {items.map((item) => 
                    <div key={item._id} onClick={() => onItemClick?.(item)}>
                        <ItemBox item={item}></ItemBox>
                    </div>
                )}
            </section> 
            : <section className="center-box max-height">
                <Empty />
            </section>}
        </>
    )
}

Items.propTypes = {
    items: PropTypes.array,
    loading: PropTypes.bool
}

Items.propTypes = {
    items: PropTypes.array,
    loading: PropTypes.bool,
    onItemClick: PropTypes.func
}

export default Items