import { Add as AddIcon, Delete as DeleteIcon, Done as DoneIcon, Edit as EditIcon, KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon } from '@mui/icons-material'
import { Backdrop, Box, Button, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React, { useState, memo, useEffect, lazy, Suspense } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Link } from '../components/styles/StyledComponents';
import AvatarCard from '../components/shared/AvatarCard';
import { SampleUsers, sampleChats } from '../constants/sampleData';
import UserItem from '../components/shared/UserItem';

const AddMemberDialog = lazy(() => import('../components/dialogs/AddMemberDialog'));
const ConfirmDeleteDialog = lazy(() => import('../components/dialogs/ConfirmDeleteDialog'));

const isAddMember = false;

const Groups = () => {

  const navigate = useNavigate();
  const chatId = useSearchParams()[0].get("group");

  const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [groupName, setGroupName] = useState('');
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState('');
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const navigateBack = () => {
    navigate('/')
  };
  // console.log("page ran");

  const handleMobile = () => {
    setisMobileMenuOpen(prev => !prev);

  };

  const updateGroupName = (e) => {
    e.preventDefault();
    setIsEdit(false);
    console.log("Update group name");
  }

  const OpenConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
    console.log('Group Deleted');
  }

  const deleteHandler = () => {
    console.log("Delete Handler");
    closeConfirmDeleteHandler();
  }

  const removeMemberHandler = (id) => {
    console.log('Remove Member', id)
  }

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  }

  const openAddMemberHandler = () => {
    console.log("Member Added");
  }

  const handleMobileClose = () => setisMobileMenuOpen(false);

  useEffect(() => {

    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }

    return () => {
      setGroupName('');
      setGroupNameUpdatedValue('');
      setIsEdit(false);
    }
  }, [chatId])


  const Iconbtns = <>
    <Box
      sx={{
        display: {
          xs: 'block',
          sm: 'none',
          position: 'fixed',
          right: '1rem',
          top: '1rem'
        }
      }}
    >
      <IconButton onClick={handleMobile} >
        <MenuIcon />
      </IconButton>
    </Box>

    <Tooltip title='back' >
      <IconButton
        sx={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',

        }}
      >
        <KeyboardBackspaceIcon />
      </IconButton>
    </Tooltip>

  </>;

  const GroupName = <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={'1rem'} padding={'3rem'} >
    {isEdit ? (
      <>
        <TextField
          value={groupNameUpdatedValue}
          onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
        />
        <IconButton onClick={updateGroupName} >
          <DoneIcon />
        </IconButton>
      </>
    ) : (
      <>
        <Typography variant='h4'>{groupName}</Typography>
        <IconButton onClick={() => setIsEdit(true)} ><EditIcon /></IconButton>
      </>
    )}
  </Stack>

  const ButtonGroup = (
    <Stack
      direction={{
        sm: 'row',
        xs: 'column-reverse'
      }}
      spacing={'1rem'}
      p={{
        xs: '0',
        sm: '1rem',
        md: '1rem 4rem'
      }}
    >
      <Button size='large' color='error' variant='outlined' startIcon={<DeleteIcon />} onClick={OpenConfirmDeleteHandler} >Delete Group</Button>
      <Button size='large' variant='contained' startIcon={<AddIcon />} onClick={openAddMemberHandler} >Add Member</Button>
    </Stack>
  )

  return (
    <Grid container height={'100vh'} >
      <Grid
        item
        sm={4}
        sx={{
          display: {
            xs: 'none',
            sm: 'block'
          }
        }}
      >
        <GroupsList myGroups={sampleChats} chatId={chatId} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          padding: '1rem 3rem'
        }}
      >
        {Iconbtns}
        {groupName && <>
          {GroupName}

          <Typography
            margin={'2rem'}
            alignSelf={'flex-start'}
            variant='body1'
          >
            Members
          </Typography>
          <Stack
            maxWidth={'45rem'}
            width={'100%'}
            boxSizing={'border-box'}
            padding={{
              sm: '1rem',
              xs: '0',
              md: '1rem 4rem'
            }}
            spacing={'2rem'}
            // bgcolor={'bisque'}
            height={'50vh'}
            overflow={'auto'}
          >
            {/* members */}
            {SampleUsers.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                isAdded
                styling={{
                  boxShadow: '0 0 0.5rem rgba(0,0,0,0.2)',
                  padding: '1rem 2rem',
                  borderRadius: '1rem'
                }}
                handler={removeMemberHandler}
              />
            ))}
          </Stack>

          {ButtonGroup}
        </>
        }
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog />
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}

      <Drawer
        sx={{
          display: { xs: 'block', sm: 'none' },          
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose} >
        <GroupsList w={'50vw'} myGroups={sampleChats} chatId={chatId} />
      </Drawer>

    </Grid>
  )
}

const GroupsList = ({ w = '100%', myGroups = [], chatId }) => (
  <Stack 
  width={w} 
  sx={{
    bgcolor: 'ButtonFace',
    height: '100vh'
  }}
  >
    {myGroups.length > 0 ? (
      myGroups.map((group) => <GroupListItem group={group} chatId={chatId} key={group._id} />)
    ) : (
      <Typography textAlign={'center'} padding={'1rem'} >
        No Group
      </Typography>
    )
    }
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, _id, avatar } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) {
          e.preventDefault();
        }
      }} >
      <Stack direction={'row'} spacing={'1rem'} alignItems={'center'} >
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  )
}
)
export default Groups
