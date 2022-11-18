import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';
import { useCookies } from 'react-cookie';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, useTheme } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import LockIcon from '@mui/icons-material/Lock';

export const Header = () => {
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const getAvatar = () => {
        if(cookies.name){
            let avatar = cookies.name;
            return avatar.charAt(0);
        }
    };


    //need to get userRole, name, profilepicture
    //possibly from cookies
    const [cookies] = useCookies('name', 'role');

    const logo = require('../image/denethaLogo.png');
    const design = require('../image/design.png');

    //array of items to be rendered in the navigation bar
    //put other items between dashboard and logout
    //use if-else to decide which items to render
    const navBarItems = [{
            name: 'Dashboard',
            path: cookies.role,
            visible: ['accountant', 'manager', 'staff', 'doctor']
        },{
            name: 'Reception',
            path: '/receptionist',
            visible: ['receptionist']
        },{
            name: 'Inventory',
            path: '/inventory',
            visible: ['accountant', 'manager']
        }, {
            name: 'Patients',
            path: '/patient',
            visible: ['receptionist', 'doctor']
        }, {
            name: 'Appointments',
            path: '/appoinmenttable',
            visible: ['receptionist', 'doctor'] 
        }, {
            name: 'Surgery',
            path: '/surgery',
            visible: ['accountant', 'receptionist', 'doctor','staff']
        },{
            name:'Meetings',
            path:'/meetings',
            visible: ['staff' , 'manager','accountant','receptionist']
            
        }
        , {
            name:'Doctor',
            path:'/doctorHome',
            visible: ['manager','doctor']
        }
        
    ];

    return (
        <div className='flex-container header' 
            style={{backgroundColor: theme.palette.primary.main}}>
            <div id='logo' className='flex-child'>
                <img src={logo} alt='logo' className='header-logo' />
            </div>
            <div id='header-design-container' >
                <img src={design} alt='header-design' id='header-design' />
            </div>
            <div id='navbar' className='flex-child right-align'>
                {navBarItems.map((item) => {
                    if(item.visible.find((element) => element===cookies.role)){
                        return (
                            <NavLink to={item.path} 
                                className='navlink'
                                key={item.name.toString()}>
                                {item.name}
                                </NavLink>
                            ); 
                    }else{
                        return null;
                    }
                })}
            </div>
            <div id='profile' className='flex-child right-align'>
                <div id='userinfo' className='flex-child'>
                    <p id='username'>{cookies.name}</p>
                    <p id='userRole'>{cookies.role}</p>
                </div>
                <div id='profilePic' >
                    <IconButton 
                        id='profile-button'
                        aria-label='account' 
                        aria-haspopup='true' 
                        aria-controls={open ? 'profile-menu' : undefined} 
                        aria-expanded={open ? 'true' : undefined}
                        size='small' 
                        onClick={handleClick} >
                        <Avatar sx={{ width: 60, height: 60 }}>
                            {getAvatar()}
                        </Avatar>
                    </IconButton>
                    <Menu 
                        id='profile-menu'
                        style={{width: 800}}
                        anchorEl={anchorEl}
                        open={open} 
                        onClick={handleClose}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                              width: '120px',
                            },
                          }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        MenuListProps={{
                            'aria-labelledby': 'profile-button',
                        }} >
                        <MenuItem>
                            <ListItemIcon>
                                <LockIcon />
                            </ListItemIcon>
                            <NavLink to='/editAcc' style={{color:'black'}} >
                                Account
                            </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <HelpIcon />
                            </ListItemIcon>
                            
                            <NavLink to='/help' style={{color:'black'}} >
                               Help
                                </NavLink>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>

                                <LogoutIcon />
                            </ListItemIcon>
                            <NavLink to='/logout' style={{color:'black'}} >
                                Logout
                                </NavLink>
                        </MenuItem>
                    </Menu>
                </div>
                
            </div>
        </div>
    );
};