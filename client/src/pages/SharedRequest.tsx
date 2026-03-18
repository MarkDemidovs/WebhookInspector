import { useParams } from "react-router-dom";
import { api } from "../lib/api";
import { useEffect, useState } from "react";

type SharedRequest = {
  id: string;
  method: string;
  body: string;
  headers: object;
  ip: string;
  received_at: string;
  share_token: string;
};

export default function SharedRequest() {
  const { token } = useParams();
  const [request, setRequest] = useState<SharedRequest | null>(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const data = await api(`/requests/share/${token}`);
        setRequest(data.data[0]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRequest();
  }, []);
  if (!request) return <div>Loading...</div>;

  return (
    <div>
      <p>{request.method}</p>
      <p>{request.ip}</p>
      <p>{request.received_at}</p>
      <p>{request.body}</p>
      <p>{JSON.stringify(request.headers)}</p>
    </div>
  );
}
