import React, { useRef, useState } from 'react';
import Tree from 'react-d3-tree';
import { useSelector } from 'react-redux';
import { convertToTree } from '../utils/treeNode';
import { Button, Backdrop } from '@mui/material';

export default function WorkspaceRight() {
  const components = useSelector((state) => state.design.components);
  const tree = convertToTree(components);
  const [viewTree, setViewTree] = useState(false);
  return (
    <div>
      <Button
        variant='contained'
        onClick={() => setViewTree(true)}
        startIcon={
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-diagram-3-fill'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5zm-6 8A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5zm6 0A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5zm6 0a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5z'
            />
          </svg>
        }
      >
        Dom Tree
      </Button>

      <DOMTreeBackdrop
        viewTree={viewTree}
        tree={tree}
        toggleViewTree={() => setViewTree(!viewTree)}
      />
    </div>
  );
}

function DOMTreeBackdrop({ viewTree, tree, toggleViewTree }) {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const [width, height] = windowSize.current;
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#ffffff4D',
      }}
      open={viewTree}
      onClick={toggleViewTree}
    >
      <Tree
        data={tree}
        orientation='vertical'
        translate={{ x: width / 2, y: height / 3 }}
      />
    </Backdrop>
  );
}
