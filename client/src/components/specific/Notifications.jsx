import { Avatar, Button, Dialog, DialogTitle, ListItem, Stack, Typography } from '@mui/material'
import React, { memo } from 'react'
import { SampleNotifications } from '../../constants/sampleData'

const Notifications = () => {

  const friendRequestHandler = ({ _id, accept }) => {

  }

  return ( 
    <Dialog open>
      <Stack p={{ xs: '1rem', sm: '2rem' }} maxWidth={'40rem'} >
        <DialogTitle>Notifications</DialogTitle>

        {
          SampleNotifications.length > 0 ? (
            SampleNotifications.map(({ sender, _id }) => <NotificationItem key={_id} sender={sender} _id={_id} handler={friendRequestHandler} />)
          ) : (<Typography textAlign={"center"} >No Notifications</Typography>)
        }
      </Stack>
    </Dialog>
  )
}

const NotificationItem = memo(({ sender, _id, handler }) => {

  const { name, avatar } = sender;

  return (
    <ListItem>
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={'1rem'}
        width={'100%'}
      >
        <Avatar src={avatar} />

        <Typography
          variant='body1'
          sx={{
            flexGrow: 1,
            display: '-webkit-box',
            webkitLineClamp: 1,
            webkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%'
          }}

        >
          {`${name} sent you a friend request`}
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} >
          <Button onClick={() => handler({ _id, accept: true })} >Accept</Button>
          <Button color='error' onClick={() => handler({ _id, accept: false })} >Reject</Button>
        </Stack>
      </Stack>
    </ListItem >
  )
})

export default Notifications