import { useAtom } from 'jotai';                        //returns cortage [value, setValue]
import { highlightModeAtom } from "../state/highlight";

export function ControlPanel() {
    const [, setMode] = useAtom(highlightModeAtom);    

    return (
        <div className="controlPanel">
            <button onClick={() => setMode("prime")}>Prime Numbers</button>
            <button onClick={() => setMode("div5")}>Divided by 5</button>
            <button onClick={() => setMode("div7")}>Divided by 7</button>
            <button onClick={() => setMode(null)}>Clear All</button>
        </div>
    );
};