import React from 'react';
import '../css/header.css';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Search from './Search';
import Avatar from '@material-ui/core/Avatar';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AppsIcon from '@material-ui/icons/Apps';
import PersonIcon from '@material-ui/icons/Person';


function Header(props){

    return(
        <div>
            <div className="header-main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-6 col-md-2 order-1 order-md-1">
                                    <div className="header-header-info">
                                        <YouTubeIcon className="header-logo"/>
                                        <div className="header-logo-name">YouTube</div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-8 order-3 order-md-2">
                                    <Search 
                                        searchValue = { props.searchValue }
                                        handleSearch = { props.handleSearch }
                                        handleSearchSubmit = { props.handleSearchSubmit }
                                    />
                                </div>
                                <div className="col-6 col-md-2 order-2 order-md-3">
                                    <div className="header-avatar-container">
                                        <AppsIcon className="header-material-icon" />
                                        <NotificationsIcon className="header-material-icon"/>
                                        <Avatar className="header-avatar">
                                            <PersonIcon style={{ fontSize : '20px' }}/>
                                        </Avatar>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Header