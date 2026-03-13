import PropTypes from "prop-types"
import { useEffect, useRef } from "react"
import '../../styles/components/bottom-sheet.css'

const BottomSheet = ({ open, onClose, children, className }) => {
    const rootRef = useRef(null)

    useEffect(() => {
        // no inline positioning — the sheet will be absolutely positioned inside its container
        return () => {}
    }, [open])

    return (
        <div ref={rootRef} className={`bottom-sheet-root ${open ? 'open' : ''} ${className || ''}`}>
            <div className="bottom-sheet-backdrop" onClick={onClose} />
            <div className="bottom-sheet-panel">
                {children}
            </div>
        </div>
    )
}

BottomSheet.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string
}

export default BottomSheet
