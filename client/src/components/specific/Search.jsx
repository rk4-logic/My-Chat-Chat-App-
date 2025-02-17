import React from 'react'
import { Dialog, Stack, DialogTitle, TextField, InputAdornment, List } from '@mui/material'
import { useInputValidation } from '6pp'
import { Search as SearchIcon } from '@mui/icons-material'
import UserItem from '../shared/UserItem'
import { SampleUsers } from '../../constants/sampleData'


const Search = () => {

  const search = useInputValidation('');

  let isLoadingSendFriendRequest = false;

  const [users, setUsers] = React.useState(SampleUsers);

  const addFriendHandler = (id) => {

  }

  return (
    <Dialog open={open} >
      <Stack p={'2rem'} direction={'column'} width={'25rem'} >
        <DialogTitle textAlign='center' >Find people</DialogTitle>
        <TextField
          label=''
          value={search.value}
          onChange={search.changeHandler}
          variant='outlined'
          size='small'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start' >
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <List>
          {
            users.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={addFriendHandler}
                handlerIsLoading={isLoadingSendFriendRequest}
              />
            ))
          }
        </List>

      </Stack>
    </Dialog>
  )
}

export default Search