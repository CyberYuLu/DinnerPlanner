import { observer } from "mobx-react-lite";
import { SidebarView } from "../views/sidebarView.jsx";
import { shoppingList } from "/src/utilities.js"
import {model} from "/src/DinnerModel.js";
const Sidebar = observer(             // needed for the presenter to update (its view) when relevant parts of the model change
    function SidebarRender(props){
        return <SidebarView number={props.model.numberOfGuests}
                            dishes={props.model.dishes}
                            onNumberChange={updateNumGuestsACB}
                            onDishInterest={updateCurrentDishIdACB}
                            onRemoveDish={removeDishACB}
                            />;
    function updateNumGuestsACB(newGuestNumber){
        props.model.setNumberOfGuests(newGuestNumber);
    }
    function updateCurrentDishIdACB(dish){
        props.model.setCurrentDishId(dish.id);
    }
    function removeDishACB(dish){
        props.model.removeFromMenu(dish)
    }
                        }
);

export { Sidebar };
