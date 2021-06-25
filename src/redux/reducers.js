import { combineReducers } from "redux";
import { AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RECEIVE_USER_LIST,RESET_USER } from "./action-types";
import {getRedirectTo} from "../utils/index";
const initUser={
    username:'',//用户名
    type:'',//用户类型
    msg:'',//错误信息
    redirectTo:'',//需要自动重定向的路由路径
}
// 产生user状态的reducer
function user(state=initUser,action){
   switch(action.type){
     case AUTH_SUCCESS://data值是user
      const {type,header}=action.data
         return {...action.data,redirectTo:getRedirectTo(type,header)}
     case ERROR_MSG://data是msg
         return {...state,msg:action.data}

     case RECEIVE_USER:  //data是user
         return action.data
     case RESET_USER:
         return {...initUser,msg:action.data}
       default:
           return state
   }
}

// 产生userlist状态的reducer
const initUserList=[]

function userList(state=initUserList,action){
    switch (action.type){
        case RECEIVE_USER_LIST:
            return action.data
            default:
                return  state
    }
}

export default combineReducers({
   user,
   userList
})
// 向外暴露的状态结构 {user:{},userList:[]}
