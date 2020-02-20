import CustomLayout from "./wrapPageElement"
//import "./src/style/normalize.css"
import "./src/style/react-flags-select.css"

// flag selectbox doesnt reset the scroll position to top
export const shouldUpdateScroll = () => {
    return false
}

export const wrapPageElement = CustomLayout
