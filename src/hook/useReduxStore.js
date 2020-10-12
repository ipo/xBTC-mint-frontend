import {useContext} from "react";
import {ReactReduxContext} from "react-redux";

export default (selectors) => {
    const {storeState} = useContext(ReactReduxContext);
    console.log("##")
    console.log(storeState);
    return selectors.map(selector => selector(storeState));
};
