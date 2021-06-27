import React, { Component } from 'react'
import { Button,NavBar } from 'antd-mobile'
import Cookies from 'js-cookie'
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import LaobanInfo from "../laoban-info/laoban-info";
import DashenInfo from "../dashen-info/dashen-info"
import { getRedirectTo } from "../../utils";
import { getUser } from "../../redux/actions";
import Dashen from "../dashen/dashen"
import Laoban from "../laoban/laoban"
import Message from "../message/message"
import Personal from "../personal/personal";
import NotFound from "../not-found/not-found"
import NavFooter from "../../components/nav-footer/nav-footer";
import Chat from "../chat/chat"

class Main extends Component {
    navList = [{
        path: '/laoban',
        // 路由路径 
        component: Laoban,
        title: '大神列表',
        icon: 'dashen',
        text: '大神',
    },
    {
        path: '/dashen',
        // 路由路径 
        component: Dashen,
        title: '老板列表',
        icon: 'laoban',
        text: '老板',
    }
        , {
        path: '/message',
        // 路由路径 
        component: Message,
        title: '消息列表',
        icon: 'message',
        text: '消息',
    },
    {
        path: '/personal',
        // 路由路径
        component: Personal,
        title: '用户中心',
        icon: 'personal',
        text: '个人',
    }
    ]
    componentDidMount() {
        //1）登录过 （cookie中有userid） 但没有登录（redux管理的user中没有_id） 发送请求获取对应的user
        const userid = Cookies.get('userid')
        const { _id } = this.props.user
        if (userid && !_id) {
            //发送异步请求  获取user
            this.props.getUser()
        }
    }
    render() {
        // 读取cookie中的userid
        const userid = Cookies.get('userid')
        // 如果没有 自动重定向到login
        if (!userid) {
            return <Redirect to='/login' />
        }
        // 如果有 读取redux中的user状态
        const user = this.props.user
        // 如果user没有_id 返回null
        if (!user._id) {
            return null
        } else {
            // 如果user有_id 显示对应的界面 已经登录了  请求根路径
            let path = this.props.location.pathname
            if (path === '/') {
                path = getRedirectTo(user.type, user.header)
                return <Redirect to={path} />
            }
        }

        // 根据user的type和header来计算一个重定向的路由路径 并自动重定向
        const {navList}=this
        const path=this.props.location.pathname
        const currentNav=navList.find(nav=>nav.path===path)
        if(currentNav){
            // 决定哪个路由需要隐藏
            if(user.type==='laoban')
          {
             navList[1].hide=true
          }else{
             navList[0].hide=true
          }
        }
        return (
            <div>
                {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> :null}
                <Switch>
                    {
                        navList.map(nav=><Route path={nav.path} component={nav.component}/>)
                    }
                    <Route path='/dasheninfo' component={DashenInfo} />
                    <Route path='/laobaninfo' component={LaobanInfo} />
                    <Route path='/chat/:userid' component={Chat}/>
                    <Route component={NotFound} />
                </Switch>
                {currentNav ?<NavFooter navList={navList}/> :null}
            </div>

        )
    }
}

export default connect(
    state => ({ user: state.user }),
    { getUser }
)(Main)
/** 1 实现自动登录：
 *1）登录过 （cookie中有userid） 但没有登录（redux管理的user中没有_id） 发送请求获取对应的user
  2）如果cookie中没有userid 直接重定向到login
  3）判断redux管理的user是否有_id 如果没有 暂时不做显示
  4）如果有 说明已经登录 显示对应的界面
  5）如果已经登录过 请求根路径 ：根据user的type和header来计算出一个重定向的路由路径 并自动重定向

 */