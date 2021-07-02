//包含n个 action creator
// 异步action
// 同步action

import { reqRegister, reqLogin, reqUpdateUser,reqUser, reqUserList,reqChatMsgList,reqReadMsg } from '../api'
import { ERROR_MSG, AUTH_SUCCESS,RECEIVE_USER,RESET_USER, RECEIVE_USER_LIST,RECEIVE_MSG_LIST,RECEIVE_MSG } from "./action-types";
   //连接客户端io
import io from 'socket.io-client'
// 初始化socketIO
function initIO(dispatch,userid){

   //单例对象 
   // 1.创建对象之前：判断对象是否已经创建，只有不存在才获取创建
   // 2.创建对象：保存对象
   // 连接服务器
   if(!io.socket){
      io.socket=io('ws://localhost:5000')
      io.socket.on('recevieMsg',function(chatMsg){
         console.log("接收到服务器的消息",chatMsg)
         // 只有当chatMsg是当前用户相关的消息，采取分发同步action保存信息
         if(userid===chatMsg.from||userid===chatMsg.to){
            dispatch(receiveMsg(chatMsg,userid))
         }
         })                                                                                                    
   }
}




//授权成功的同步action
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
// 错误提示信息的action
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })
// 接收用户的同步action
const receiveUser=(user)=>({type:RECEIVE_USER,data:user})
// 接收用户重置同步的action
export const resetUser=(msg)=>({type:RESET_USER,data:msg})
// 接收用户列表的同步action
const receiveUserList=(userList)=>({type:RECEIVE_USER_LIST,data:userList})
// 接收信息列表的同步action
const receiveMsgList=({users,chatMsgs,userid})=>({type:RECEIVE_MSG_LIST,data:{users,chatMsgs,userid}})
// 接收信息同步action
const receiveMsg=(chatMsg,userid)=>({type:RECEIVE_MSG,data:{chatMsg,userid}}) 






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
         getMsgList(dispatch,result.data._id)
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
         getMsgList(dispatch,result.data._id)
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
            getMsgList(dispatch,result.data._id)
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
// 获取消息列表
async function getMsgList (dispatch,userid){
   initIO(dispatch,userid)
   const response=await reqChatMsgList()
   const result=response.data
   if(result.code===0){
      const {users,chatMsgs}=result.data
      // 分发同步action
      dispatch(receiveMsgList({users,chatMsgs,userid})
      )
   }

}
// 异步发送消息的action
export const sendMsg=(from,to,content)=>{
   return dispatch=>{
      console.log('发送消息',from,to,content);
     
      // 发送消息
      io.socket.emit('sendMsg',{from,to,content})
   }
}


