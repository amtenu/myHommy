
import axios from "axios";
import { useEffect, useState } from "react";


export default function Agents() {
  
  //state

  const [agents, setAgents] = useState();
  const [loading,setLoading] =useState(true)
  

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {

      const { data } = await axios.get("/agents");
      setAgents(data)
      console.log(data)
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  };

  return (
    <div>
      <h1 className="display-1 bg-primary text-light p-5">Agents</h1>
      {/*<pre>{JSON.stringify({adsForSell,adsForRent}, null, 5)}</pre>*/}
      <div className="container">
        <div className="row">
          {agents?.map((agent) => (
            <h1>{agent.username}</h1>
          ))}
        </div>
      </div>

      
      {/*<pre>{JSON.stringify({adsForSell,adsForRent}, null, 5)}</pre>*/}
     
    </div>
  );
}
