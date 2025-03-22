
export const initialState={
    userDetails:{},
    channels:[]
}

const reducer= (state, action)=>{
    switch(action.type){
        case "setUserDetails":
            return {...state, userDetails:action.payload}
            
        case "setChannels" :
                return {...state, channels:action.payload}

        default:
            console.log("An unkown action was dispatched")
            break;
        }
} 

export default reducer