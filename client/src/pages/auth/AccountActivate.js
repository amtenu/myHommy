import { useParams } from "react-router-dom"
export default function AccountActivate(){

    const params=useParams();
    const token =params.token
    console.log(token)

    return (
        <div className="display-1 d-flex justify-content-center align-items-center vh-100 " style={{marginTop:"-5%"}}>
            Please wait .......
        </div>
    )

}