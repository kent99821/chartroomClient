import React, { Component } from 'react'
import {connect} from 'react-redux' 
import {List,Badge} from 'antd-mobile'
const Item=List.Item
const Brief=Item.Brief
// 对chatMsgs进行分组 并得到每组的lastMsg组成的数组
function getLastMsgs(chatMsgs,userId){
  // 创建容器装所有的chatMsgs
  const lastMsgObjs={}
  chatMsgs.forEach(msg => {
    // 对msg进行个体统计
    if(msg.to===userId&&!msg.read){
      msg.unReadCount=1
    }else{
      msg.unReadCount=0
    }
   
    const chatId=msg.chat_id
    let lastMsg=lastMsgObjs[chatId]
    if(!lastMsg){
      lastMsgObjs[chatId]=msg

    }else{
      const unReadCount=lastMsg.unReadCount+msg.unReadCount
    
      if(msg.create_time>lastMsg.create_time){
        lastMsgObjs[chatId]=msg
      }
      lastMsgObjs[chatId].unReadCount=unReadCount
    }
  });
  // 得到所有的lastMsg的数组
  const lastMsgs=Object.values(lastMsgObjs)
  // 对数组进行排序（按照create_time降序)
  lastMsgs.sort(function(m1,m2){
    return m2.create_time-m1.create_time
  })
  return lastMsgs
}
 class Message extends Component {
     render() {
       const{user}=this.props
       const {users,chatMsgs}=this.props.chat
      //  对chatMsgs按chat_id进行分组
      const lastMsgs=getLastMsgs(chatMsgs,user._id)
          return (
            
            <List style={{marginTop:50,marginBottom:50}}>
              {
                lastMsgs.map(msg=>{
                  const targetUserId=msg.to===user._id?msg.from:msg.to
                  const targetUser=users[targetUserId]
                  return (
                    <Item 
                    key={msg._id}
                    extra={<Badge text={msg.unReadCount}/>}
                    thumb={targetUser.header?require(`../../assets/images/${targetUser.header}.png`).default:null}
                    arrow='horizontal'
                    onClick={()=>this.props.history.push(`/chat/${targetUserId}`)}
                    >
                     {msg.content}
                      <Brief>用户:{targetUser.username}</Brief>
                    </Item>
                  )

                }
     

                )
              }
             
            </List>
          ) 
        } }
export default connect (
            state=>({user:state.user,chat:state.chat}),
            {}
        )(Message)