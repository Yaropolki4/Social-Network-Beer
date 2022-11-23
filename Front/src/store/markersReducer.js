const defaultState = {
    markers: [{coords: [55.709028, 37.517944], author: 'friend', title: 'Новый бухич', descr: 'всем приходить'},
              {coords: [55.719028, 37.517944], author: 'friend', title: 'Новый бухич', descr: 'всем приходить'},
              {coords: [55.729028, 37.517944], author: 'friend', title: 'Новый бухич', descr: 'всем приходить'}],
}


export const markersReducer = (state = defaultState, action) => {
    switch(action.type){
      case 'ADD_MARKER':
        return {...state, markers: [...state.markers, action.payload]};
      case 'DELETE_MARKER':
        return {...state, markers: state.markers.filter(item => item.coords !== action.payload)};
      default:
        return state;
    }
  }