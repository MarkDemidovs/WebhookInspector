import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EndpointDetail() {
    const { slug } = useParams();
    const [requests, setRequests] = useState([])
    
    useEffect(() => {
        
    }, [])

}