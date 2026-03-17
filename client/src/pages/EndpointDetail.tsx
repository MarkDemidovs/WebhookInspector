import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../lib/api";

type Request = {
  id: string;
  method: string;
  body: string;
  headers: object;
  ip: string;
  received_at: string;
  share_token: string;
};

export default function EndpointDetail() {
  const { id } = useParams();
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const fetchEndpoints = async () => {
      try {
        const data = await api(`/endpoints/${id}/requests`);

        setRequests(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEndpoints();
  }, []);

  return requests.map((request) => (
    <div key={request.id}>
      <p>{request.method}</p>
      <p>{request.body}</p>
      <p>{JSON.stringify(request.headers)}</p> <p>{request.received_at}</p>
      <p>{request.share_token}</p>
    </div>
  ));
}
