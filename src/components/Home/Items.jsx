import PropTypes from "prop-types"
import ItemBox from "../Common/Item-Box"
import { Empty } from "antd"

const Items = ({items}) => {

    return (
        <> 
        {items.length 
            ? <section className="cards">
                {items.map((item) => 
                    <ItemBox key={item._id} item={item}></ItemBox>
                )}
            </section> 
            : <section className="center-box">
                <Empty />
            </section>}
        </>
    )
}

Items.propTypes = {
    items: PropTypes.array
}

export default Items