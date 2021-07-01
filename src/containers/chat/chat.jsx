import React, { Component } from "react";
import { connect } from "react-redux";
import { NavBar, List, InputItem, Grid,Icon } from "antd-mobile";
import { sendMsg } from "../../redux/actions";
import "../../assets/css/index.css";
const Item = List.Item;
class Chat extends Component {
  state = {
    content: "",
    isShow: false, // 是否显示表情列表
  };
  componentWillMount() {
    const emojis = [
      "😀",
      "😃",
      "😄",
      "😁",
      "😆",
      "🤣",
      "😂",
      "🙂",
      "😉",
      "😊",
      "😇",
      "😍",
      "🤩",
      "😗",
      "😚",
      "😙",
      "😋",
      "😛",
      "😜",
      "🤪",
      "😝",
      "🤗",
      "🤭",
      "🤫",
      "🤔",
      "🤐",
      "🤨",
      "😐",
      "😑",
      "😶",
      "😶‍🌫️",
      "😏",
      "😒",
      "🙄",
      "😬",
      "🤥",
      "😌",
      "😔",
      "😪",
      "🤤",
      "😴",
      "🤒",
      "👌",
      "🙏",
      "💪",
    ];
    this.emojis = emojis.map((emji) => ({ text: emji }));
  };
  componentDidMount(){
    // 初始化显示列表
    window.scrollTo(0,document.body.scrollHeight)
  }
  componentDidUpdate(){
    // 更新显示列表
    window.scrollTo(0,document.body.scrollHeight)
  }

  handleSend = () => {
    const from = this.props.user._id;
    const id = this.props.match.params.userid;
    const content = this.state.content.trim();
    //发送请求
    if (content) {
      this.props.sendMsg(from, id, content);
    }
    //清除content
    this.setState({ content: "",isShow:false });
  };
  // 切换显示表情包
  toggleShow=()=>{
    const isShow=!this.state.isShow
    this.setState({isShow})
    if(isShow){
      setTimeout(()=>{
        window.dispatchEvent(new Event('resize'))
      },0)
    }

  };
  render() {
    const { user } = this.props;
    const { users, chatMsgs } = this.props.chat;
    // 计算当前聊天的ID
    const meId = user._id;
    if (!users[meId]) {
      return null;
    }
    const targetId = this.props.match.params.userid;
    const chatId = [meId, targetId].sort().join("_");
    //对chatMsgs过滤
    const msgs = chatMsgs.filter((msg) => msg.chat_id === chatId);
    // 得到用户的头像
    const targetHeader = users[targetId].header;
    const targetIcon = targetHeader
      ? require(`../../assets/images/${targetHeader}.png`).default
      : null;

    return (
      <div id="chat-page">
        <NavBar 
        icon={<Icon type='left' />}
         className="sticky-header"
         onLeftClick={()=>this.props.history.goBack()}
         >
           {users[targetId].username}
           </NavBar>
        <List className="chatPage">
          {msgs.map((msg) => {
            // 对方发给我的消息
            if (targetId === msg.from) {
              return (
                <Item key={msg._id} thumb={targetIcon}>
                  {msg.content}
                </Item>
              );
            } else {
              return (
                <Item key={msg._id} className="chat-me" extra="我">
                  {msg.content}
                </Item>
              );
            }
          })}
        </List>
        
        <div className="am-tab-bar">
          <InputItem
            value={this.state.content}
            onChange={(val) => this.setState({ content: val })}
            placeholder="请输入"
            onFocus={()=>this.setState({isShow:false})}
            extra={
              <span>
                <span onClick={this.toggleShow}>😊</span>
                <span className="sp" onClick={this.handleSend}>
                  发送
                </span>
              </span>
            }
          />
      
        </div>
        {this.state.isShow?(
      <Grid
      data={this.emojis}
      columnNum={8}
      carouselMaxRow={4}
      isCarousel={true}
      onClick={(item) => {
        this.setState({ content: this.state.content + item.text });
      }}
    />
        ):null}
  
      </div>
    );
  }
}
export default connect((state) => ({ user: state.user, chat: state.chat }), {
  sendMsg,
})(Chat);
