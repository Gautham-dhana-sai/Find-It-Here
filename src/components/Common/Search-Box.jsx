import { useEffect, useMemo } from "react"
import "../../styles/inputs.css"
import PropTypes from "prop-types"
import { debounce } from "lodash"

const SearchBox = ({triggerSearch}) => {

    const debouncedFetch = useMemo(() => {
        return debounce((value) => {
        triggerSearch(value);
        }, 500);
    }, []);

    useEffect(() => {
        return () => {
        debouncedFetch.cancel();
        };
    }, [debouncedFetch]);

    const handleChange = (e) => {
        debouncedFetch(e.target.value);
    };
    return (
        <>
            <section className="box">
                <div className="small-row">
                    <div className="small-square box icon-center">
                        <i className="fa-solid fa-filter fa-xl"></i>
                    </div>
                    <div className="small-rect box">
                        <div className="input-wrapper">
                            <input type="text" placeholder="Search..." className="form-control" 
                            onChange={handleChange}/>
                            <i className="fa-duotone fa-solid fa-magnifying-glass fa-xl input-icon"></i>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

SearchBox.propTypes = {
    triggerSearch: PropTypes.func
}

export default SearchBox