// 显示指定用户列表的ui组件
import React, { Component } from "react";
import PropTypes from "prop-types";
import { WingBlank,WhiteSpace,Card } from "antd-mobile";
const Header=Card.Header
const Body=Card.Body

export default  class UserList extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired,
  };

  render() {
     
    return (
      <div>
        <WingBlank style={{marginBottom:50,marginTop:50}}>
          {
             this.props.userList.map(user=>(
                <div key={user._id}>
                <WhiteSpace />
                <Card>
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

