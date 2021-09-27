//My MUI-React Components
import {
  AppBar,
  Badge,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
} from '@mui/material';
//My Icon
import MenuIcon from '@mui/icons-material/Menu';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

interface Props {
  toggleDrawer: any
}

const NavBar = ({toggleDrawer} : Props) => {
  return (
    <Grid container direction="row" alignItems="baseline">
      <AppBar position="fixed" style={{ background: '#FF3939' }}>
        <Toolbar>
          <Grid item xs={8}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton size="large" edge="end" color="inherit" sx={{ mr: 2 }}>
              <CalendarTodayIcon />
            </IconButton>
            <IconButton size="large" edge="end" color="inherit">
              <ChatIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4} alignItems="center">
            <TextField
              variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
              placeholder="Search here"
              style={{
                backgroundColor: '#fff',
                borderBottomColor: 'transparent',
                marginTop: '7px',
                width: '250px',
              }}
              sx={{ pl: 2, pr: 1 }}
            />
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              sx={{ ml: 2 }}
            >
              <Badge badgeContent={4} color="error">
                <EmailIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" edge="end" color="inherit" sx={{ mr: 2 }}>
              <Badge badgeContent={17} color="error">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" edge="end" color="inherit">
              <Badge>
                <PowerSettingsNewIcon />
              </Badge>
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default NavBar;
