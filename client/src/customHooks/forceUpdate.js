import { useState } from "react";

//create your forceUpdate hook
function useForceUpdate() {
    const [value, setValue] = useState(true); //boolean state
    return () => setValue(!value); // toggle the state to force render
}
export default useForceUpdate;
