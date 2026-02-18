import PropTypes from "prop-types"
import ItemBox from "../Common/Item-Box"
import { Empty } from "antd"

const Items = ({items, loading}) => {

    return (
        <> 
        {!loading && items.length 
            ? <section className="cards">
                {items.map((item) => 
                    <ItemBox key={item._id} item={item}></ItemBox>
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

export default Items