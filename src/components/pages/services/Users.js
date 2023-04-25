import { useState } from "react";
import axios from "axios";
export function Users(){
    let [manager,setManager]=useState([]);
    let [client,setClient]=useState([]);
    let [driver,setDriver]=useState([]);
const url = "http://localhost:8080/api/v1/user";
axios.get(url).then((res)=>{
    if(res.data.role==="manager") setManager(res.data);
    if(res.data.role==="client") setClient(res.data);
    if(res.data.role==="driver") setDriver(res.data);
});

}
export let manager = Users.manager;
