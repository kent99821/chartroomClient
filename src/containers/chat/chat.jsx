import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar, List, InputItem } from "antd-mobile";
import {sendMsg} from '../../redux/actions'
import '../../assets/css/index.css'
const Item = List.Item;
class Chat extends Component {
    state={
        content:""
    }
    handleSend=()=>{
        const from=this.props.user._id
        const id=this.props.match.params.userid
        const content=this.state.content.trim()
        //发送请求
        if(content){
            this.props.sendMsg(from,id,content)
        }
        //清除content
        this.setState({content:""})
    }
  render() {
    const {user}=this.props
    const {users,chatMsgs}=this.props.chat
    // 计算当前聊天的ID
    const meId=user._id
    if(!users[meId]){
      return null
    }
    const targetId=this.props.match.params.userid
    const chatId=[meId,targetId].sort().join('_')
    //对chatMsgs过滤
    const msgs=chatMsgs.filter(msg=>msg.chat_id===chatId)
    // 得到用户的头像
    const targetHeader=users[targetId].header
    const targetIcon=targetHeader? require(`../../assets/images/${targetHeader}.png`).default:null

    return(
    <div id="chat-page" >
      <NavBar>aa</NavBar>
      <List>
        {
          msgs.map(msg=>{
            // 对方发给我的消息
            if(targetId===msg.form){
              return(
                <Item key={msg._id} thumb={targetIcon}>
                  {msg.content}
                </Item>
              )
            }else{
              return(
                <Item key={msg._id} className="chat-me" extra="我">
                   {msg.content}
                </Item>
              )
            }
          })
        }

      </List>
      <div className="am-tab-bar">
        <InputItem 
        value={this.state.content}
        onChange={val=>this.setState({content:val})}
        placeholder="请输入" extra={<span className="sp" onClick={this.handleSend}>发送</span>} />
      </div>

    </div>

    )
  }
}
export default connect((state) => ({user:state.user,chat:state.chat}), {sendMsg})(Chat);
