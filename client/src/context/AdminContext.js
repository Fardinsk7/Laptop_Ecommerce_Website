import axios from "axios";
import { createContext, useContext, useEffect,useState } from "react";
import { storage } from "../FirebaseUpload";

// dotenv.config();
const AdminContext = createContext();
const API = `${process.env.REACT_APP_API_KEY}`

const AdminContextProvider = ({children})=>{
    const [imgData,setimgData] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [alldata,setAlldata] = useState([]);
    const [alert,setAlert] = useState(false);
    const [msg,setMsg] = useState("")
    const [alertColor,setAlertColor] = useState("")
    const [user,setUser] = useState({
        firstname:"",
        lastname:"",
        username:"",
        email:"",
      })


    const allProductsdata = async()=>{
        const data = await axios.get(`${API}/admin/getallProduct`)
        setAlldata(data.data)
      }

    const uploadProduct = async(ProductData)=>{
        // eslint-disable-next-line
        const res = await axios.post(`${API}/admin/uploadProducts`,ProductData);
    }

    const deleteProduct = async(id)=>{
        const res = await axios.delete(`${API}/delete/${id}`)
        if(res){
            allProductsdata()
        }
    }
    

    const uploadToFirebase = (imgs)=>{
        let arr =[];
        imgs.map((img)=>{
            const uploadtask = storage.ref(`/images/${Date.now()}--${img.name}`).put(img);
            uploadtask.on("state_change",
            (snapshot)=>{
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setUploadProgress(progress);
            },
            (err)=>{
                console.log(`"Error "${err}`);
            },
            async()=>{
                const url = await uploadtask.snapshot.ref.getDownloadURL()
                arr.push(url)
            }
            )

            setimgData(arr)
            
            return ""
        })


    }

    const showAlert =(msg,color)=>{
        setMsg(msg);
        setAlert(true)
        setAlertColor(color)
        setTimeout(() => {
            setAlert(false)
        }, 2000);
    }

    const adminLogout = ()=>{
        localStorage.removeItem("Id");
    }

    //Authentication
    const UserSignUp = async(data)=>{
        const res = await axios.post(`${API}/signup`,data);
        return res;
    }

    const UserLogin = async(data)=>{
        const res = await axios.post(`${API}/login`,data)
        return res;

    }

    const getUser = async()=>{
        if(localStorage.getItem("authToken")){
            const res = await axios.get(`${API}/getuser/${localStorage.getItem("authToken")}`)
            return res;

        }
    }
    

    useEffect(()=>{
        allProductsdata()
        getUser()
        .then((res)=>{
            setUser({firstname:res.data.firstname,lastname:res.data.lastname,username:`${res.data.firstname} ${res.data.lastname}`,email:res.data.email})

        }).catch((err)=>(err))
        // eslint-disable-next-line
    },[localStorage.getItem("authToken")])

    return <AdminContext.Provider value={{uploadProduct,imgData,uploadToFirebase,uploadProgress,alldata,deleteProduct,showAlert,msg,alert,alertColor,adminLogout,UserSignUp,UserLogin,getUser,user,setUser}} >{children}</AdminContext.Provider>
}

//custom hook
const useAdmninContext = ()=>{
    return useContext(AdminContext);
}

export {AdminContextProvider,AdminContext,useAdmninContext};