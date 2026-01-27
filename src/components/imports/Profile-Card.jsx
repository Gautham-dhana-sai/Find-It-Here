import PropTypes from "prop-types";
import "../../styles/components/profile-card.css"
import "../../styles/allignment.css"
import { useEffect, useState } from "react";
import { capitalizeFirst } from "../../library/functions/string";
import { getSSUID } from "../../library/functions/sessionStorage";
import { ProfileService } from "../../library/services/profile.service";

const ProfileCard = ({profileData}) => {

  const profileService = new ProfileService()

  const [data, setData] = useState({})
  const [itemData, setItemData] = useState({})

  useEffect(() => {
    setData(profileData)
  }, [profileData])

  useEffect(() => {
    getProfileItemsData()
  }, [])

  const getProfileItemsData = async () => {
    const body = {
      user: getSSUID()
    }
    const countsData = await profileService.getProfileItemsData(body)
    console.log(countsData)
    setItemData(countsData.data)
  }

  return (
    <>
    <div className="center-box m-top-15">
      <div className="profile-card">
        <div className="infos">
          <div className="image"></div>
          <div className="info">
            <div>
              <h5 className="name">{capitalizeFirst(data?.username)}</h5>
              <div className="function">#{data?.userId?.toUpperCase()}</div>
            </div>
            <div className="stats">
              <p className="flex flex-col">
                Added
                <span className="state-value">{itemData?.items_count}</span>
              </p>
              <p className="flex">
                Liked by
                <span className="state-value">{itemData?.items_likes}</span>
              </p>
            </div>
          </div>
        </div>
          <button className="request" type="button">Edit Profile</button>
        <div className="divide-2">
          <button className="request" type="button"> My Items </button>
          <button className="request" type="button"> My Likes </button>
        </div>
      </div>
      </div>
    </>
  );
};

ProfileCard.propTypes = {
  profileData: PropTypes.node
}

export default ProfileCard;
