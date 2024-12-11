import {
    Container,
    CardMedia,
    Box,
    Typography,
    CardActions,
    Chip,
    Button,
    Rating,
    Stack,
} from '@mui/material';
import { useEffect, useState } from 'react';
import useAxios from '../services/useAxios';
import { useParams } from 'react-router-dom';

function Book() {
    const [book, setBook] = useState({});
    const { data, alert, loading, error, get } = useAxios(
        'http://localhost:3000'
    );
    const { id } = useParams();

    // Initial book fetch
    useEffect(() => {
        const getBook = async () => {
            const response = await get(`books/${id}`);
            setBook(response);
        };
        getBook();
    }, []);

    return (
        <Box sx={{ mx: 'auto', width: '70%', mt: '3rem', maxWidth: 630 }}>
            <Stack
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    height: 500,
                    minWidth: 200,
                }}
                key={book.name}
            >
                <CardMedia
                    sx={{
                        height: '100%',
                        width: 300,
                        backgroundSize: 'contain',
                        backgroundColor: '#004d3f'
                    }}
                    image='http://localhost:3000/book_placeholder.svg'
                    title={book.name}
                >
                    <CardMedia
                        sx={{
                            height: '100%',
                            width: 300,
                        }}
                        image={book.img}
                        title={book.name}
                    ></CardMedia>
                </CardMedia>
                <Box sx={{ pt: 1, pl: 5, flex: 1 }}>
                    <Typography variant='h4' component='h2' sx={{ mt: 2 }}>
                        {book.name}
                    </Typography>
                    <Typography variant='subtitle1' sx={{ mb: 2 }}>
                        {book.author}
                    </Typography>
                    {book?.genres?.map((genre, i) => (
                        <Chip
                            key={i}
                            label={genre}
                            variant='outlined'
                            size='small'
                            sx={{ mr: 1 }}
                        />
                    ))}
                    <CardActions
                        sx={{
                            justifyContent: 'space-between',
                            mt: '1rem',
                            p: 0,
                        }}
                    >
                        <Rating
                            name='read-only'
                            value={+book.stars}
                            readOnly
                            size='large'
                        />
                    </CardActions>
                </Box>
            </Stack>
        </Box>
    );
}

export default Book;
