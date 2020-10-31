export const initialState = {
  /*
  number of ADD_TO_BASKET in busket icon and parameters
   */
  basket:[],
};

  //Selector
export const getBasketTotal = (basket) =>
  /*
  reduce function is working like loop how many item is clicking
  then this all clicking item's price is adding.Inital amount is null(0).
  */
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer=(state,action)=>{
  switch (action.type) {
    case "ADD_TO_BASKET":
      return{
        ...state,
  /*
  ...state.busket = how many busket is clicking that will show in
  the busket. action.item = all the item 
  */
        basket: [...state.basket,action.item],
      };

      case "REMOVE_FROM_BASKET":
        const index=state.basket.findIndex(
          (basketItem)=> basketItem.id === action.id
        );
        let newBasket=[...state.basket];

        if(index>=0){
          newBasket.splice(index,1);
        }
        return{
          ...state,
          basket:newBasket
        }

      case "SET_USER":
        return{
          ...state,
          //it depends on App.js user will be set there
          user:action.user
        }

     case 'EMPTY_BASKET':
     return{
       ...state,
       basket:[]
     }

    default:
      return state;
  }
};

export default reducer;
