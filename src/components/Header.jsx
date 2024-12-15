import { Link } from 'react-router-dom';
import { Button, Box, AppBar, Toolbar, Typography } from '@mui/material';
import { Search, SearchIconWrapper, StyledInputBase } from './Searchbar';
import SearchIcon from '@mui/icons-material/Search';

function Header({ searchTerm, setSearchTerm }) {
    // Update searchterm when searchbar input changes
    const handleChange = (e) => {
        const { value } = e.target;
        setSearchTerm(value);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1 }}
                    >
                        <Typography
                            variant='h5'
                            noWrap
                            component={Link}
                            to='/'
                            sx={{
                                mr: 2,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Books
                        </Typography>
                    </Typography>
                    <Search sx={{ marginRight: '1rem' }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            value={searchTerm}
                            onChange={handleChange}
                            placeholder='Search…'
                        />
                    </Search>

                    <Button
                        color='inherit'
                        variant='text'
                        component={Link}
                        to='/'
                    >
                        Home
                    </Button>
                    <Button
                        color='inherit'
                        variant='text'
                        component={Link}
                        to='/addnew'
                    >
                        Add New
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Header;
