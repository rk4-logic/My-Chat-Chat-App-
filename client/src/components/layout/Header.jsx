import { AppBar, Box, Toolbar, Typography, IconButton, Tooltip, Backdrop } from '@mui/material';
import React, { lazy, Suspense, useState } from 'react';
import { Navcolor } from '../../constants/color';
import { Add as AddIcon, Menu as MenuIcon, Search as SearchIcon, Group as GroupIcon, Logout, Notifications } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Search = lazy(() => import('../specific/Search'));
const Notication = lazy(() => import('../specific/Notifications'));
const NewGroup = lazy(() => import('../specific/NewGroup'));

const Header = () => {

  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewgroup, setIsNewgroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const navigate = useNavigate();

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  }

  const openSearch = () => {
    setIsSearch((prev) => !prev);
  }

  const openNewGroup = () => {
    setIsNewgroup((prev) => !prev);
  }

  const openNotification = () => {
    setIsNotification((prev) => !prev);
  }

  const navigateToGroup = () => navigate('/groups');

  const handleLogout = () => {
    console.log(" Logout")
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position='static' sx={{
          bgcolor: Navcolor,
        }} >

          <Toolbar>
            <Typography variant='h6' sx={{
              display: { xs: 'none', sm: 'block' }
            }} >
              My Chat
            </Typography>
            <Box
              sx={{
                display: { xs: 'block', sm: 'none' }
              }}
            >
              <IconButton color='inherit' onClick={handleMobile} >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Tooltip title='Search'>
              <IconButton color='inherit' size='large' onClick={openSearch} >
                <SearchIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Notifications'>
              <IconButton color='inherit' size='large' onClick={openNotification} >
                <Notifications />
              </IconButton>
            </Tooltip>
            <Tooltip title='New Group'>
              <IconButton color='inherit' size='large' onClick={openNewGroup} >
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Manage Groups'>
              <IconButton color='inherit' size='large' onClick={navigateToGroup} >
                <GroupIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Log Out'>
              <IconButton color='inherit' size='large' onClick={handleLogout} >
                <Logout />
              </IconButton>
            </Tooltip>

          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />} >
          <Search />
        </Suspense>
      )
      }

      {isNotification && (
        <Suspense fallback={<Backdrop open />} >
          <Notication />
        </Suspense>
      )

      }

      {isNewgroup && (
        <Suspense fallback={<Backdrop open />} >
          <NewGroup />
        </Suspense>
      )

      }
    </>
  )
}

export default Header
