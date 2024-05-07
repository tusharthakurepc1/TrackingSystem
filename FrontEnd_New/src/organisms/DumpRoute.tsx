import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DumpRoute = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        navigate("/sysuser-dashboard")
    },[])
    return (<></>)
}

export default DumpRoute