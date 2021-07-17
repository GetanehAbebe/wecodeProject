import './details.css'

const Details = () => {

    return <div classNameName='text-center'>
        <div className="row mx-2">
            <div className="col-sm-7">
                <h1>Pasta with Pesto and Tomatoes</h1>
                <figure>
                    <img src="https://images.unsplash.com/photo-1593253787226-567eda4ad32d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2434&q=80" />
                    <figcaption>Shania Pinnata</figcaption>
                </figure>
            </div>
            <div className='col-sm-4'>
                <p>This quick and delicious pasta dish is the perfect way to use up a summer bounty of basil and tomatoes! </p>
                <p>Don't have a green thumb? Never fear! You can knock out this classNameic pasta dish in no time with a jar of prepared pesto sauce. </p>
                <ul>
                    <li>🍽 Serves: 4</li>
                    <li>⏱ Prep Time: 5 minutes</li>
                    <li>👨‍🍳 Cook Time: 25 minutes</li>
                    <li>🍝 Total Time: 30 minutes</li>
                </ul>
            </div>
        </div>
        <div className='row'>
            <div className="col-sm-5 mx-2">
                <div>
                    <h2>The Ingredients</h2>
                    <ul className="ingredients">
                        <li><span>8 oz. spaghetti or linguine pasta</span></li>
                        <li><span>2 cups fresh basil leaves, plus 4-8 reserved leaves for garnish</span></li>
                        <li><span>2 cloves garlic</span></li>
                        <li><span>2 tbsp. pine nuts or blanched almonds</span></li>
                        <li><span>1/2 cup olive oil</span></li>
                        <li><span>1/2 cup grated Parmesan cheese, plus 2 tbsp. for garnish.</span></li>
                        <li><span>1/8 tsp salt</span></li>
                        <li><span>1 pint cherry tomatoes</span></li>
                        <li><span>1 tsp olive oil</span></li>
                    </ul>
                </div>
            </div>
            <div className="col-sm-5">
                <h2>The Process</h2>
                <p className="tip">Click each stage to strikethrough when complete</p>
                <ol className="instructions">
                    <li><span>Bring 4 quarts of water to a rolling boil in a large pot. Salt the water generously and add the pasta.</span></li>
                    <li>While the pasta cooks, make the pesto:
                        <ul className="pesto">
                            <li><span>Remove stems from basil leaves.</span></li>
                            <li><span>Put the basil, garlic, and pine nuts or almonds into the bowl of a food processor and pulse it a few times to chop them up.</span></li>
                            <li><span>Then, turn the food processor on and <strong>slowly</strong> pour the olive oil through the feeder tube to blend with the chopped herbs and nuts. </span></li>
                            <li><span>Process until all ingredients are fully blended, stopping the food processor to scrape down the sides occasionally to get it all mixed. </span></li>
                            <li><span>Turn off the food processor, and add the salt and Parmesan, then pulse a few times to blend.</span></li>
                        </ul>
                    </li>
                    <li><span>Heat a large skillet over medium heat. </span></li>
                    <li><span>Add the 1/2 tsp. olive oil to the heated skillet.</span></li>
                    <li><span>Add the cherry tomatoes to the skillet and let them blister, stirring occasionally and gently so they don't burst. </span></li>
                    <li><span>Remove tomatoes from the pan and set aside. </span></li>
                    <li><span>Drain the pasta, reserving 1/4 cup of the cooking water.</span></li>
                    <li><span>Return the pasta to the pot</span></li>
                    <li><span>Add the reserved cooking water and pesto to the pasta and stir to mix</span></li>
                    <li><span>Plate the pasta and add 6-8 tomatoes to each plate</span></li>
                    <li><span>Garnish with reserved basil leaves and Parmesan and serve.</span></li>
                </ol>
                <p className="last">😋 Buon Appetito!</p>
            </div>
        </div>
    </div>
}
export default Details