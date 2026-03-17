import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../lib/api";

export default function EndpointDetail() {
    const { id } = useParams();
    const [requests, setRequests] = useState([])
    
    useEffect(() => {
        const fetchEndpoints = async () => {
            try {
                const data = await api(`/endpoints/${id}/requests`);

                setRequests(data.data);
            } catch (err) {
                console.error(err)
            }
        }
        fetchEndpoints();
    }, [])

    return(
        
    )
}