import { useEffect, useState } from "react"
import "../../styles/boxes.css"
import SingleSelectDropdown from "./Single-Select-Dropdown"
import { LocationsService } from "../../library/services/locations.service"
import PropTypes from "prop-types"

const LocationBox = ({triggerLocation, required, data}) => {
    const locationsService = new LocationsService()
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [state, setState] = useState(null)
    const [city, setCity] = useState(null)


    useEffect(() => {
        const getStatesList = async () => {
            const response = await locationsService.getStatesListOfCountry({country: "India"})
            if(response?.data?.states){
                setStates(response.data.states)
            }
        }

        const getCitiesList = async () => {
            const response = await locationsService.getCitiesListOfCountry({country: "India"})
            if(response?.data){
                setCities(response.data)
            }
        }
        if(!states.length) getStatesList()
        if(!cities.length) getCitiesList()
    }, [])

    useEffect(() => {
        triggerData()
    }, [city])

    useEffect(() => {
        if(data.state !== state) setState(data.state)
        if(data.city !== city) setCity(data.city)
    }, [data])

    const selectedState = async (item) => {
        const response = await locationsService.getCitiesOfState({country: "India", state: item})
        setState(item)
        setCity(null)
        if(response?.data){
            setCities(response.data)
        }
    }

    const selectedCity = (item) => {
        setCity(item)
    }

    const triggerData = () => {
        const body = {
            state,
            city
        }
        triggerLocation(body)
    }

    return (
        <>
            <section className="strip-row">
                <SingleSelectDropdown placeholder={"State"} display={state} options={states} selectItem={selectedState} required={required}></SingleSelectDropdown>
                <SingleSelectDropdown placeholder={"City"} display={city} list={cities} selectItem={selectedCity} required={required}></SingleSelectDropdown>
            </section>
        </>
    )
}

LocationBox.propTypes = {
    triggerLocation: PropTypes.func,
    required: PropTypes.bool,
    data: PropTypes.shape({
        state: PropTypes.string,
        city: PropTypes.string
    })
}

export default LocationBox