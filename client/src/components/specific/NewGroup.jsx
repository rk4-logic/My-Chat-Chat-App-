import React, { useState } from 'react'
import { Dialog, Stack, DialogTitle, Typography, TextField, Button } from '@mui/material'
import { SampleUsers } from '../../constants/sampleData'
import UserItem from '../shared/UserItem'
import { useInputValidation } from '6pp'

const NewGroup = () => {

  const groupName = useInputValidation("");

  const [members, setMembers] = useState(SampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {

    setSelectedMembers((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }

  const submitHandler = () => { }
  const closeHandler = () => { }

  return (
    <Dialog open onClose={closeHandler} >
      <Stack p={{ xs: '1rem', sm: '3rem' }} width={'25rem'} spacing={'2rem'} >
        <DialogTitle textAlign={'center'} variant='h4'>New Group</DialogTitle>

        <TextField label='Group Name' value={groupName.value} onChange={groupName.changeHandler} />

        <Typography variant='body1' >Members</Typography>

        <Stack>
          {members.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(i._id)}
            />
          ))}
        </Stack>

        <Stack direction={'row'}>
          <Button variant='text' color='error'>Cancel</Button>
          <Button variant='contained' onClick={submitHandler} >Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup