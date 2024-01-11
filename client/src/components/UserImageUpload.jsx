import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startDesign } from '../utils/reducers/designSlice';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { setMessage } from '../utils/reducers/appSlice';

export default function UserImageUpload() {
  const dispatch = useDispatch();
  const userImage = useSelector((state) => state.design.userImage);
  return (
    <Box sx={{ padding: '50px' }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const file = e.target.userImage.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
              const dataUrl = reader.result;
              dispatch(startDesign(dataUrl));
            };
            reader.readAsDataURL(file);
          }
        }}
      >
        <Button>
          <label htmlFor='userImage' className='btn'>
            {`Select ${userImage ? 'new ' : ''}image`}
          </label>
        </Button>

        <input
          accept='image/*'
          id='userImage'
          type='file'
          name='userImage'
          style={{ visibility: 'hidden' }}
          onChange={() => {
            dispatch(
              setMessage({ severity: 'success', text: 'Upload successfully' })
            );
          }}
        />
        <Button type='submit' variant='contained'>
          {userImage ? 'Replace design' : "Let's get started"}
        </Button>
      </form>
    </Box>
  );
}
