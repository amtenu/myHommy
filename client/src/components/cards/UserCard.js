import { Badge } from "antd";
import { Link } from "react-router-dom";
import AdFeatures from "./AdFeatures";
import {format} from "../../helpers/ad"
import Calgary from '../../assets/Calgary.jpg'
import dayjs from "dayjs";
import { useEffect,useState } from "react";
import axios from "axios";


import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime); //fromnow() 3 days ago etc
export default function UserCard({ user}) {

    const [count,setCount]=useState()


    useEffect(()=>{
if(user?._id){
    fetchCountOfAdverts()
}
    },[user?._id])

    const fetchCountOfAdverts= async () =>{
      try{
     const {data} =await axios.get(`/agent-advert-count/${user._id}`);
     setCount(data.length);
      } catch (err){
        console.log(err)
      }
    }

  return (
    <div className="col-lg-4 p-4 gx-4 gy-4">
      <Link to={`/agent/${user.username}`}>
        <Badge.Ribbon
          text={`Has ${count} listings.`}
        //   color={`${ad?.action === "Sell" ? "red" : "blue"}`}
        >
          <div className="Card hoverable shadow">
            <img
              src={user?.photo?.Location ?? Calgary}
              alt={user.username}
              style={{ height: "250px", objectFit: "cover" }}
            />
          </div>
          <div className="card-body">
            <h3>{user?.username ?? user.name}</h3>
            <p> Joined {dayjs(user.createdAt).fromNow()}</p>

            
          </div>
        </Badge.Ribbon>
      </Link>
    </div>
  );
}
