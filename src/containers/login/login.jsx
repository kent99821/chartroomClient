import React, { Component } from 'react'
import axios from 'axios'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile'

import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import {login}  from '../../redux/actions'

import Logo from '../../components/logo/logo'


 class Login extends Component {
    state = {
        username: "",
        password: "",
    
    }
    // 收集数据
    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }
    // 获取数据
    login = () => {
       this.props.login(this.state)
    }
    // 跳转登录界面
    toRegister = () => {
    this.props.history.replace('/register')
    }


    render() {

        const {type}=this.state
        const {msg,redirectTo}=this.props.user
        // redirectTo有值
        if(redirectTo){
            return <Redirect to={redirectTo}/>
        }

        return (
            <div>
                <NavBar>boss&nbsp;直&nbsp;聘</NavBar>
                <Logo />
                <WingBlank>
                    <List>
                    { msg?<div className='error-msg'>{msg}</div>:null }
                        <WhiteSpace />
                        <InputItem placeholder="请输入用户名" onChange={val => this.handleChange('username', val)} >用户名:</InputItem>
                        <WhiteSpace />
                        <InputItem placeholder="请输入密码" type="password" onChange={val => this.handleChange('password', val)}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <WhiteSpace />                    
                        <WhiteSpace />
                        <Button type="primary" onClick={this.login} >登&nbsp;&nbsp;&nbsp;陆</Button>
                        <WhiteSpace />
                        <Button onClick={this.toRegister}>还没有账户</Button>

                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {login}
)(Login)