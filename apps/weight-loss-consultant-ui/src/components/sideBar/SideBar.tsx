import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import HomeIcon from '@mui/icons-material/Home';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NavBar from '../navBar/NavBar';
import { Avatar, Box, ListItemButton } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import Grid from '@mui/material/Grid';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const SideBar = () => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const listAdminTabs = [
    {
      title: 'Dashboard',
      icon: <HomeIcon sx={{ color: '#fff' }}/>
    },
    {
      title: 'User Manager',
      icon: <PeopleAltIcon sx={{ color: '#fff' }} />
    },
    {
      title: 'Inbox',
      icon: <MailOutlineIcon sx={{ color: '#fff' }} />
    },
    {
      title: 'Calendar',
      icon: <CalendarTodayIcon sx={{ color: '#fff' }} />
    },
    {
      title: 'Chart',
      icon: <ShowChartIcon sx={{ color: '#fff' }} />
    },
  ]

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          (event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift'
        ) {
          return;
        }
        setState({ ...state, [anchor]: open });
      };

  const listTabsAdmin = listAdminTabs.map((tab, index) => {
    return (
      <ListItemButton
        selected={selectedIndex === index}
        onClick={(event) => handleListItemClick(event, index)}
        sx={{
          borderRadius: 2,
        }}
      >
        <ListItemIcon>
          {tab.icon}
        </ListItemIcon>
        <ListItemText primary={tab.title} sx={{ color: '#fff' }} />
      </ListItemButton>
    )
  })

  const list = () => (
    <Box
      sx={{ width: 260, backgroundColor: '#000000', height: '100%' }}
      role="presentation"
      onClick={toggleDrawer('left', false)}
      onKeyDown={toggleDrawer('left', false)}
    >
      <List
        component="nav"
        aria-label="main mailbox folders"
        sx={{ padding: 2 }}
      >
        <Grid container>
          <Grid
            item
            sx={{
              backgroundColor: '#E5E5E5',
              borderRadius: '50%',
              width: 120,
              height: 120,
              marginLeft: 5.5
            }}
          >
            <Avatar
              src="https://i.pinimg.com/originals/07/ee/80/07ee8085ddf885764544a3fc7d7e1df2.jpg"
              sx={{ width: 100, height: 100, justifySelf: 'center' }}
              style={{
                border: '3px solid #ff3939',
                marginLeft: 6.7,
                marginTop: 6.6,
              }}
            />
            s
          </Grid>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
          >
            <ListItemText primary="Welcome," sx={{ color: '#fff',  marginLeft:8,  marginTop: 2 }} />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
          >
            <ListItemText
              primary="Hatsune Miku"
              sx={{ color: '#ff3939', marginBottom: 3, marginLeft: 6 }}
            />
          </Box>
        </Grid>
        {listTabsAdmin}
      </List>
    </Box>
  );

  return (
    <div>
      <NavBar toggleDrawer={toggleDrawer('left', true)} />
      {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list()}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SideBar;
