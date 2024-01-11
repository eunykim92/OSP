import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { removeComponent } from '../utils/reducers/designSlice';
import { setMessage } from '../utils/reducers/appSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ParentSelector from './userInputs/ParentSelector';
import AddNewComponent from './userInputs/AddNewComponent';

export default function WorkspaceLeft() {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const components = useSelector((state) => state.design.components);
  return (
    <Box>
      <AddNewComponent setSelectedIdx={setSelectedIdx} />
      <List>
        {components.map((item, idx) => (
          <ComponentDisplay
            component={item}
            key={idx}
            idx={idx}
            handleListItemClick={() => setSelectedIdx(idx)}
            selected={selectedIdx === idx}
          />
        ))}
      </List>
    </Box>
  );
}

function ComponentDisplay({ component, idx, handleListItemClick, selected }) {
  const childrenNum = useSelector((state) => state.design.components).filter(
    (item) => item.parent === idx
  ).length;
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
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ListItemText primary={component.name} />
        <IconButton sx={{ marginLeft: '20px' }}>
          <EditIcon />
        </IconButton>

        {idx > 0 && (
          <Delete
            name={component.name}
            idx={idx}
            canDelete={childrenNum === 0}
          />
        )}
      </Box>

      {selected && <ParentSelector childIdx={idx} />}
    </ListItemButton>
  );
}

function Delete({ name, idx, canDelete }) {
  const message = canDelete
    ? {
        severity: 'success',
        text: 'Successfully removed a component ' + name,
      }
    : {
        severity: 'error',
        text: `Component ${name} has children. Failed to remove`,
      };
  return (
    <IconButton
      onClick={() => {
        if (canDelete) {
          dispatch(removeComponent(idx));
        }
        dispatch(setMessage(message));
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
}
