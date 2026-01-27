import { useEffect, useState } from "react"
import HeaderTab from "../Common/Header-Tab"
import InfiniteBox from "../Common/Infinite-Box"
import ProfileCard from "../imports/Profile-Card"
import { ProfileService } from "../../library/services/profile.service"

const Profile = () => {

    const profileService = new ProfileService()

    const [data, setData] = useState({})

    useEffect(() => {
        const getProfileData = async () => {
            const body = {email: 'gautham523sai@gmail.com'}
            const profileData = await profileService.getProfileData(body)
            console.log(profileData)
            if(profileData.success){
                setData(profileData.data)
            } else {
                setData({})
            }
        }

       getProfileData()
    }, [])
    return (
        <>
            <InfiniteBox>
                <HeaderTab header={'Profile'} route={'/'}></HeaderTab>
                <ProfileCard profileData={data}></ProfileCard>
            </InfiniteBox>
        </>
    )
}

export default Profile