// 显示指定用户列表的ui组件
import React, { Component } from "react";
import PropTypes from "prop-types";
import { WingBlank,WhiteSpace,Card } from "antd-mobile";
import { withRouter } from "react-router";
import "../../assets/css/index.css";
const Header=Card.Header
const Body=Card.Body

 class UserList extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired,
  };

  render() {
     
    return (
      <div className="list">
        <WingBlank  style={{marginBottom:50,marginTop:50}}>
          {
             this.props.userList.map(user=>(
                <div key={user._id}>
                <WhiteSpace />
                <Card onClick={()=>this.props.history.push(`/chat/${user._id}`)}>
                  <Header
                    thumb={require(`../../assets/images/${user.header}.png`).default}
                    extra={user.username}
                  />
                  <Body>
                    <div>职位:{user.post}</div>
                    {user.company?<div>公司:{user.company}</div>:null}
                    {user.salary?<div>月薪: {user.salary}</div>:null}
                    <div>描述: {user.info}</div>
                  </Body>
                </Card>
              </div>
              ))
          }
        </WingBlank>
      </div>
    );
  }
}
export default withRouter(UserList)

