import PropTypes from "prop-types";
import "../../styles/dropdown.css"
import "../../styles/boxes.css"
import { useEffect, useRef, useState } from "react";


const SingleSelectDropdown = ({ placeholder, display, options, list, selectItem, required}) => {
  const dropdownRef = useRef(null)
  const [check, checkbox] = useState(false)
  const [touched, setTouched] = useState(false)
  const [value, setValue] = useState(null)

  const dropdownClicked = () => {
    checkbox(true)
  }

  const itemClicked = (item) => {
    selectItem(item)
    setTouched(false)
    setValue(item)
  }

  useEffect(() => {
    const handleBlur = (e) => {
      if (
        check && dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        checkbox(false)
        setTouched(true)
      }
    }

    document.addEventListener("mousedown", handleBlur)
    return () => document.removeEventListener("mousedown", handleBlur)
  }, [check])

  useEffect(() => {
    if(!display) setValue(display)
    setTouched(false)
  }, [display])
  
  return (
    <>
      <div className={`strip box ${required && touched && !value ? "border-color-red" : ""}`}>
        <div ref={dropdownRef} className="select-wrapper form-control dropdown-pad">
          <input type="checkbox" id={placeholder} className="select-toggle" checked={check} readOnly onClick={() => dropdownClicked()}/>

          <label htmlFor={placeholder} className="select-trigger">
            <span className="selected-value">{display || placeholder}</span>
            <span className="chevron">▾</span>
          </label>

          <ul className="select-menu">
            {list?.length 
              ? list.map((name, index) => <li key={`${name}-${index}`} onClick={() => itemClicked(name)}>{name}</li>)
              : options?.length && options.map((option) => <li key={option.state_code} onClick={() => itemClicked(option.name)}>{option.name}</li>)}
          </ul>
        </div>
      </div>
    </>
  );
};

SingleSelectDropdown.propTypes = {
    placeholder: PropTypes.string,
    display: PropTypes.string,
    options: PropTypes.array,
    list: PropTypes.array,
    required: PropTypes.bool,
    selectItem: PropTypes.func
}

export default SingleSelectDropdown;
