import React  from "react";
import propTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

const Item=TabBar.Item
class NavFooter extends React.Component{
    static propTypes={
        navList:propTypes.array.isRequired,
        unReadCount:propTypes.number.isRequired
        
    }
    render(){
        // nav.hide = true/false hide 代表当前项应该被隐藏
        const navList=this.props.navList.filter(nav=>!nav.hide)
        let {unReadCount}=this.props
        const {pathname}=this.props.location
        return (
            <TabBar>
                {
                    navList.map((nav,index)=>(
                        
                        <Item key={nav.path}
                         badge={nav.path==='/message'?unReadCount:0}
                         title={nav.text}
                         icon={{uri: require(`../../assets/images/${nav.icon}.png`).default}} 
                         selectedIcon={{uri: require(`../../assets/images/${nav.icon}-selected.png`).default}} 
                         selected={pathname===nav.path}
                         onPress={() => { this.props.history.replace(nav.path) }} />
                             
                    ))
                }
            </TabBar>
        )
    }
}
export default withRouter(NavFooter)