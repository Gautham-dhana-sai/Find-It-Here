import PropTypes from "prop-types"
import ItemBox from "../Common/Item-Box"
import { Empty } from "antd"
import PendulumLoader from "../imports/Pendulum-Loader"

const Items = ({items, loading, onItemClick}) => {

    return (
        <> 
        {items.length 
            ? <section className="cards">
                {items.map((item) => 
                    <div key={item._id} onClick={() => onItemClick?.(item)}>
                        <ItemBox item={item}></ItemBox>
                    </div>
                )}
            </section> 
            : <section className="center-box items-max-height">
                {loading ? <PendulumLoader /> : <Empty />}
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