import { createContext, useState } from "react"
import {storage} from "../thirdparty/firebase"
import {ref,getDownloadURL, uploadBytesResumable} from "firebase/storage"

const DmfsseContex = createContext({})


export const DmfsseContextProvider = ({children}) => {
    // signup field error
    const [dashboardTab, setDasboardTab] = useState("dashboard")
    const [isAdding, setIsAdding] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [showDetail, setShowDetail] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [detailData, setDetailData] = useState(null)
    const [isChatStarted, setIsChatStarted] = useState(false)
    const [showOfferModal, setShowOfferModal] = useState(false)
    const [userpage, setUserPage] = useState(0)
    const [orderpage, setOrderPage] = useState(0)
    
    

    const [isFarmerOrSse, setIsFarmerOrSse] = useState(false);
    const [imageUrl, setImageUrl] = useState(null)
    const [progressPercent, setProgressPercent] = useState(0);
    const [file, setFile] = useState(null)
    const [showSidebar, setShowSideBar] = useState(false)

    const handleImageUpload = () => {

        if(!file) return
        const storageRef = ref(storage, `files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef,file)
        
        uploadTask.on("state_changed",
          (snapshot) => {

            const progress =
              Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgressPercent(progress);
          },
          (error) => {
            alert(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log(downloadURL)
              setImageUrl(downloadURL)
            });
          }
        );
      }
    
    const toggleSideBar = () => {
      setShowSideBar(!showSidebar)
    }

    const context = {
        isFarmerOrSse,
        setIsFarmerOrSse,
        handleImageUpload,
        setFile,
        imageUrl,
        progressPercent,
        toggleSideBar,

        showSidebar,
        dashboardTab,
        setDasboardTab,
        isAdding, setIsAdding,
        showModal,setShowModal,
        isEditing, setIsEditing,
        showDetail, setShowDetail, setImageUrl, setProgressPercent,
        detailData, setDetailData
        , isChatStarted, setIsChatStarted,showOfferModal, setShowOfferModal,
        userpage, setUserPage,
        orderpage, setOrderPage
    }

    return <DmfsseContex.Provider value={context}>
        {children}
    </DmfsseContex.Provider>
}

export default DmfsseContex;