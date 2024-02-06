import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
export default function Dashboard(){
    return <h1>
        <FontAwesomeIcon icon={faTwitch} style={{
            color: "red",
        }}/>
    </h1>;
}