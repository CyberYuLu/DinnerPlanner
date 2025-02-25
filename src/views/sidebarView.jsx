import { dishType, menuPrice, sortDishes } from "../utilities"

export function SidebarView(props) {
  return (

    <div>
      <button onClick={decrementGuestsACB} disabled={props.number <= 1}>-</button>
      <span>{props.number}</span>
      <button onClick={incrementGuestsACB} >+</button>
      <table>
        <tbody>
          {sortDishes(props.dishes).map(dishTableRowCB)}
          <tr>
            <td></td>
            <td>Total: </td>
            <td></td>
            <td className="align-right">{(props.number * menuPrice(props.dishes)).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
    //"SidebarView stub: number is " + numberOfGuests + " and we have " + dishesLength + " dishes"
  );

  function decrementGuestsACB
  () {
    props.onNumberChange(props.number - 1);
  }
  function incrementGuestsACB() {
    props.onNumberChange(props.number + 1);
  }
  function dishTableRowCB(dish) {
    function dishLinkACB() {
      props.onDishInterest(dish);
    }
  
    function removeDishACB() {
      props.onRemoveDish(dish);
    }
  
    return (
      <tr key={dish.id}>
        <td>
          <button onClick={removeDishACB}>X</button>
        </td>
        <td>
          <a onClick={dishLinkACB} href="#">{dish.title}</a>
        </td>
        <td>{dishType(dish)}</td>
        <td className="align-right">{(props.number * dish.pricePerServing).toFixed(2)}</td>
      </tr>
    );
  }
}
