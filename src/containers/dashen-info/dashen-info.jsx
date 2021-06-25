// 大神信息完善的路由组件
// 老板信息完善的路由组件
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { NavBar,InputItem,Button,TextareaItem } from "antd-mobile";
import HeaderSelector from '../../components/header-selector/header-selector'
import { updateUser  } from "../../redux/actions"; 
 class DashenInfo extends Component{
    state={
        header: '', // 头像名称
        post: '', // 职位
        info: '', // 个人或职位简介
    }
    //更新header
    setHeader=(header)=>{
        this.setState({
            header
        })
    }
    handelChange=(name,value)=>{
        this.setState({
            [name]:value
        })
    }
    save=()=>{
        this.props.updateUser(this.state)
    }
    render(){
        const {header,type}=this.props.user
        if(header){ //信息已经完善
         const path=type==='dashen'?'/dashen':'/laoban'
         return <Redirect to={path}/>
        }
      return(
          <div>
              <NavBar>工程师信息完善</NavBar>
              <HeaderSelector setHeader={this.setHeader}/>
              <InputItem placeholder="请输入求职岗位"  onChange={val=>{this.handelChange('post',val)}}>求职岗位:</InputItem>
              <TextareaItem rows={3} placeholder="请输入个人介绍" onChange={val=>{this.handelChange('info',val)}} title='个人介绍:'/>
              <Button type="primary" onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>

          </div>
      )
    }
}
export default connect(
    state=>({user:state.user}),
    {updateUser}
)(DashenInfo)