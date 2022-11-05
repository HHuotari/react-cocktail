import axios from "axios";
import { useEffect, useState} from "react"

export default function Cocktail() {
    const [strDrink, setstrDrink] = useState('');
    const [strGlass, setstrGlass] = useState('');
    const [strInstructions, setstrInstructions] = useState('')
    const [strIngredient, setStrIngredient] = useState('')
    const [image, setImage] = useState('')
    const [search, setsearch] = useState('')
    const [loading, setLoading] = useState(false)

    const random_url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    const search_url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + search

    let strIngredients = [];
    let strMeasures = [];

    for (let i = 1; i < 16; i++) {
        strIngredients.push("strIngredient" + i);
        strMeasures.push("strMeasure" + i);
      }
    
    function FindCocktail(){
        axios.get(search_url)
            .then((response) => {
            console.log(response.data);
            setstrDrink(response.data.drinks[0].strDrink);
            setstrGlass(response.data.drinks[0].strGlass);
            setstrInstructions(response.data.drinks[0].strInstructions);
            setImage(response.data.drinks[0].strDrinkThumb);

            const drinks = response.data.drinks[0];
            setStrIngredient([]);

            for (let i = 0; i < strIngredients.length; i++) {
                if(drinks[strIngredients[i]] && drinks[strMeasures[i]]){
                    const newIngredient = drinks[strIngredients[i]] + ": " + drinks[strMeasures[i]] + ' ';
                    setStrIngredient(strIngredient => [...strIngredient, newIngredient]);
                }
        }
            setLoading(false);
        })
    }

        function RandomCocktail() {
            window.location.reload(false);
        } 

        useEffect(() => {
            axios.get(random_url)
                .then((response) => {
                console.log(response.data);
                setstrDrink(response.data.drinks[0].strDrink);
                setstrGlass(response.data.drinks[0].strGlass);
                setstrInstructions(response.data.drinks[0].strInstructions);
                setImage(response.data.drinks[0].strDrinkThumb);

                const drinks = response.data.drinks[0];
                setStrIngredient([]);

                for (let i = 0; i < strIngredients.length; i++) {
                    if(drinks[strIngredients[i]] && drinks[strMeasures[i]]){
                        const newIngredient = drinks[strIngredients[i]] + ": " + drinks[strMeasures[i]]  + ' ';
                        setStrIngredient(strIngredient => [...strIngredient, newIngredient]);
                    }
            }
                setLoading(false);
            })
        }, [])
    
        if(loading){
            return <h3>Loading...</h3>
        }
    
        return (
            <div>
                <h1>Cocktail of the day</h1>
                <div className="search">
                    <input className="search" type="text" name="search" value={search} onChange={(e) => setsearch(e.target.value)} placeholder="Search by name" />
                    <button className="search" onClick={FindCocktail} type="submit">Search</button>
                    <button className="search" onClick={RandomCocktail}>Random</button>
                </div>
                <h2>{strDrink}</h2>
                <img src={image} alt={strDrink} />
                <h3>Glass</h3>
                <p>{strGlass}</p>
                <h3>Instructions</h3>
                <div className="instructions">
                    <p>{strInstructions}</p>
                </div>  
                <h3>Ingredients</h3>
                <p>{strIngredient}</p>
            </div>
        )
}