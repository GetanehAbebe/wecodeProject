import { useContext } from "react";
import FavoritesContext from "../context/favorite-context";
import ShowAllRecipes from "../sections/ShowAllRecipes";
function FavoritesPage() {
    const FavoritesCtx = useContext(FavoritesContext);
    let content;
    if (FavoritesCtx.totalFavorites === 0) {
        content = <p>You have no favorites</p>;
    } else {
        content = <ShowAllRecipes recipes={FavoritesCtx.favorites} />;
    }
    return (
        <section>
            <h1>My Favorites</h1>
            {content}
        </section>
    );
}