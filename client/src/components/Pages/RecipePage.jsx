import './recipePage.css'

const RecipePage = () => {
    return <body>
        <div className='ft-recipe'>
            <div className='ft-recipe__thumb'>
                <span id='close-modal'>
                    <i className='ion ion-md-close'></i>
                </span>
                <h3>Today's featured Recipe</h3>
                <img src="one.jpg" alt="strawberry waffle" />
            </div>
            <div className='ft-recipe__content'>
                <header className='content__header'>
                    <div className='row-wrapper'>
                        <h2 className='recipe-title'>Strawberry waffle</h2>
                        <div className='user-rating'></div>

                    </div>
                    <ul className='recipe-details'>
                        <li className='recipe-details-item time'>
                            <i className='ion ion-ios-clock-outline'>
                            </i>
                            <span className='value'>20</span>
                            <span className='title'>Minutes</span>
                        </li>
                        <li className='recipe-details-item ingredients'>
                            <i className='ion ion-ios-book-outline'>
                            </i>
                            <span className='value'></span>
                            <span className='title'>Ingredients</span>
                        </li>
                        <li className='recipe-details-item servings'>
                            <i className='ion ion-ios-person-outline'>
                            </i>
                            <span className='value'>4-6</span>
                            <span className='title'>Serving</span>
                        </li>

                    </ul>
                </header>
                <p className='description'>
                    loremip  sumadsasdasd  ad ad sdfsdf
                    sdf....

                </p>
                <footer className='content__footer'><a href='#'>View Recipe</a></footer>
            </div>

        </div>
    </body>
}
export default RecipePage