import React, { Component } from 'react'

import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button,
} from 'antd-mobile'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import {register}  from '../../redux/actions'

import Logo from '../../components/logo/logo'
const ListItem = List.Item

 class Register extends Component {
    state = {
        username: "",
        password: "",
        password2: "",
        type: "dashen",

    }
    // 收集数据
    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }
    // 获取数据
    register = () => {
    this.props.register(this.state)
    }
    // 跳转登录界面
    toLogin = () => {
    this.props.history.replace('/login')
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
                        <InputItem placeholder="请输入确认密码" type="password" onChange={val => this.handleChange('password2', val)}>确认密码:</InputItem>
                        <WhiteSpace />
                        <ListItem>
                            <span>用户类型:</span>
                  &nbsp;&nbsp;&nbsp;
                  <Radio checked={this.state.type == 'dashen'} onClick={() => { this.handleChange('type', 'dashen') }}>工程师</Radio>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Radio checked={this.state.type == 'laoban'} onClick={() => { this.handleChange('type', 'laoban') }}>boss</Radio>
                        </ListItem>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.register} >注&nbsp;&nbsp;&nbsp;册</Button>
                        <WhiteSpace />
                        <Button onClick={this.toLogin}>已有账户</Button>

                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {register}
)(Register)