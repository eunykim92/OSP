import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { addComponent, setParent } from '../utils/reducers/designSlice';
import { setMessage } from '../utils/reducers/appSlice';

export default function WorkspaceLeft() {
  const components = useSelector((state) => state.design.components);
  console.log('components are: ', components);
  const dispatch = useDispatch();
  const [selectedIdx, setSelectedIdx] = useState(null);

  function handleListItemClick(idx) {
    setSelectedIdx(idx);
  }

  return (
    <Box>
      <form
        style={{ display: 'flex' }}
        onSubmit={(e) => {
          e.preventDefault();
          const name = e.target.newComponent.value;
          if (name.length === 0) {
            dispatch(
              setMessage({
                severity: 'error',
                text: 'React component name cannot be empty.',
              })
            );
          } else {
            const firstLetter = name[0];
            if (firstLetter === firstLetter.toLowerCase()) {
              dispatch(
                setMessage({
                  severity: 'error',
                  text: 'React component name must start with an uppercase letter.',
                })
              );
            } else {
              dispatch(addComponent(e.target.newComponent.value));
              setSelectedIdx(components.length);
            }
          }
        }}
      >
        <TextField
          id='new-component'
          name='newComponent'
          label='New Component'
          variant='outlined'
        />
        <IconButton type='submit'>
          <AddCircleIcon />
        </IconButton>
      </form>
      <List>
        {components.map((item, idx) => (
          <ComponentDisplay
            component={item}
            key={idx}
            idx={idx}
            handleListItemClick={handleListItemClick}
            selected={selectedIdx === idx}
          />
        ))}
      </List>
    </Box>
  );
}

function ComponentDisplay({ component, idx, handleListItemClick, selected }) {
  return (
    <ListItemButton
      selected={selected}
      onClick={() => handleListItemClick(idx)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        width: '100%',
      }}
    >
      <ListItemText primary={component.name} />
      {selected && <ParentSelector childIdx={idx} />}
    </ListItemButton>
  );
}

function ParentSelector({ childIdx }) {
  const components = useSelector((state) => state.design.components);
  const dispatch = useDispatch();
  const parent = components[childIdx].parent;
  const [parentValue, setParentValue] = useState(
    parent
      ? JSON.stringify({ name: components[parent].name, index: parent })
      : 'null'
  );
  return (
    <TextField
      select
      key={childIdx}
      label='parent'
      name='parent'
      value={parentValue}
      onChange={(e) => {
        if (e.target.value !== 'null') {
          const parentIdx = JSON.parse(e.target.value).index;
          setParentValue(e.target.value);
          dispatch(setParent({ childIdx, parentIdx }));
        } else {
          setParentValue('null');
        }
      }}
    >
      {components.map((item, i) =>
        i !== childIdx ? (
          <MenuItem
            key={i}
            value={JSON.stringify({ name: item.name, index: i })}
          >
            {item.name + ', ' + i}
          </MenuItem>
        ) : null
      )}
      <MenuItem value={'null'}>null</MenuItem>
    </TextField>
  );
}
