// 老板信息完善的路由组件
import React,{Component} from 'react'
import {connect} from 'react-redux'
import { NavBar,InputItem,TextareaItem,Button } from "antd-mobile";
import {Redirect} from 'react-router-dom'
import HeaderSelector from '../../components/header-selector/header-selector'
import { updateUser  } from "../../redux/actions"; 
class LaobanInfo extends Component{
    state={
        header: '', // 头像名称
        post: '', // 职位
        info: '', // 个人或职位简介
        company: '', // 公司名称
        salary: '' // 月薪
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
              <NavBar>boss信息完善</NavBar>
              <HeaderSelector setHeader={this.setHeader}/>
              <InputItem placeholder="请输入职位" onChange={val=>{this.handelChange('post',val)}}>招聘职位:</InputItem>
              <InputItem placeholder="请输入公司名称" onChange={val=>{this.handelChange('company',val)}}>公司名称:</InputItem>
              <InputItem placeholder="请输入薪资" onChange={val=>{this.handelChange('salary',val)}}>职位薪资:</InputItem>
              <TextareaItem title="职位要求:" rows={3} onChange={val=>{this.handelChange('info',val)}}/>
              <Button type="primary" onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>

          </div>
      )
    }
}
export default connect(
    state=>({user:state.user}),
    {updateUser}
)(LaobanInfo)