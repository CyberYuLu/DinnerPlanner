import { observer } from "mobx-react-lite";
import { SummaryView } from "../views/summaryView.jsx"
import { shoppingList } from "/src/utilities.js";

const Summary = observer((props) => {
  
  const menu = props.model.dishes || []; 

  
  const ingredients = shoppingList(menu);

 
  console.log("Ingredients length:", ingredients.length);
  console.log("Ingredients:", ingredients);

  return (
    <SummaryView
      people={props.model.numberOfGuests} 
      ingredients={ingredients}  
    />
  );
});


export { Summary };