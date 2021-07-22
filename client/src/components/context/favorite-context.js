import { createContext, useState } from "react";
import MeetupItem from "../components/meetups/meetupItem";
const FavoritesContext = createContext({
    favorites: [],
    totalFavorites: 0,
    addFavorite: (FavotriteMeetup) => { },
    removeFavorite: (meetupId) => { },
    itemFavorite: (meetupId) => { }


}
)
export function FavoritesContextProvider(props) {
    const [userFavorites, SetUserFavorites] = useState([])
    function removeFavoriteHandler(meetupId) {
        SetUserFavorites(prevUserFavorites => {
            return prevUserFavorites.filter(meetup => meetup.id !== meetupId)
        })
    }

    function addFavoriteHandler(FavotriteMeetup) {
        SetUserFavorites((prevUserFavorites) => {
            return prevUserFavorites.concat(FavotriteMeetup)
        })
    }
    function itemIsFavoriteHandler(meetupId) {
        return userFavorites.some(meetup => meetup.id === meetupId)
    }
    const context = {
        favorites: userFavorites,
        totalFavorites: userFavorites.length,
        addFavorite: addFavoriteHandler,
        removeFavorite: removeFavoriteHandler,
        itemIsFavorite: itemIsFavoriteHandler
    }
    return <FavoritesContext.Provider value={context}>
        {props.children}
    </FavoritesContext.Provider>
}
export default FavoritesContext