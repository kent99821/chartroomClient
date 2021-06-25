//包含n个 action creator
// 异步action
// 同步action

import { reqRegister, reqLogin, reqUpdateUser,reqUser, reqUserList } from '../api'
import { ERROR_MSG, AUTH_SUCCESS,RECEIVE_USER,RESET_USER, RECEIVE_USER_LIST } from "./action-types";

//授权成功的同步action
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
// 错误提示信息的action
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })
// 接收用户的同步action
const receiveUser=(user)=>({type:RECEIVE_USER,data:user})
// 接收用户重置同步的action
export const resetUser=(msg)=>({type:RESET_USER,data:msg})
// 接收用户列表的同步action
export const receiveUserList=(userList)=>({type:RECEIVE_USER_LIST,data:userList})



// 异步action 注册
export const register = ({ username, password, password2, type }) => {
   // 表单的前台检查 
   if (!username || !password || !type) { return errorMsg('用户名密码必须输入') }
   if (password !== password2) {
      return errorMsg('输入密码不一致')
   }
   // 表单数据合法
   return async dispatch => {

      // 发送注册的异步ajax请求
      const response = await reqRegister({ username, password, type })
      const result = response.data
      if (result.code == 0) {//成功
         //分发成功action
         dispatch(authSuccess(result.data))
      } else {//失败

         dispatch(errorMsg(result.msg))
      }
   }
}

// 登录
export const login = (user) => {
   const { username, password } = user
   // 表单的前台检查 
   if (!user) {
      return errorMsg('用户名必须指定')
   }
   else if (!password) {
      return errorMsg('密码必须指定')
   }
   return async dispatch => {
      // 发送注册的异步ajax请求
      const res = await reqLogin(user)
      const result = res.data
      if (result.code == 0) {//成功
         //分发成功action
         dispatch(authSuccess(result.data))
      } else {//失败
         dispatch(errorMsg(result.msg))
      }
   }
}

// 更新
export const updateUser=(user)=>{
   return async dispatch=>{
          const response=await reqUpdateUser(user)
          const result=response.data
          if(result.code===0){ //更新data
              dispatch (receiveUser(result.data))
          }else{//更新失败：msg
              dispatch(resetUser(result.msg))
          }

   }
}
// 获取用户action
export const getUser=()=>{
   return async dispatch=>{
      const response=await reqUser()
          const result=response.data
          if(result.code===0){ //更新data
              dispatch (receiveUser(result.data))
          }else{//更新失败：msg
              dispatch(resetUser(result.msg))
          }

   }
}
// 获取用户列表的action
export const getUserList=(type)=>{
   return async dispatch=>{
      const response=await reqUserList(type)
      const result=response.data
      if(result.code===0){ //更新data
          dispatch (receiveUserList(result.data))
      }else{//更新失败：msg
          dispatch(resetUser(result.msg))
      }
   }
}