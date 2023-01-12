import React from 'react';
import { RecipeTile } from './RecipeTile.js';
export function FoodPlannerHome(props) {
    const recipe_list = ['Greek Dinner Spaghetti with Feta','Pork and Pepper Enchiladas']

    return (
        <div>
            <header className="Food-Planner-header">
                <h2>Recipes</h2>
            </header>
            <body className="Food-Planner-body">
                {recipe_list.map(i => {
                    return <RecipeTile name={i}/>
                })}
            </body>
        </div>
    );
}