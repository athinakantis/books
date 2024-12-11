import { useEffect, useState, useMemo } from 'react';
import {
    Box,
    Card,
    CardActions,
    CardMedia,
    Button,
    CircularProgress,
    Stack,
    Rating,
    Chip,
    Typography,
} from '@mui/material';
import useAxios from '../services/useAxios';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

function Books() {
    const { data, alert, loading, error, get } = useAxios('http://localhost:3000');
    const [books, setBooks] = useState([]);
    const [searchTerm] = useOutletContext();
    const navigate = useNavigate();

    // Initial book fetch
    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await get('books');
                setBooks(response);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        if (data.length === 0) {
            getBooks();
        }
    }, []);

    // Filter method. Runs when searchterm is not falsy
    useMemo(() => {
        if (searchTerm) {
            const filteredBooks = [];
            filteredBooks.push(
                data.filter(
                    (item) =>
                        item.author
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                        item.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                        item.genres.some((genre) =>
                            genre
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                        )
                )
            );
            setBooks(filteredBooks.flat());
        } else {
            setBooks(data);
        }
    }, [searchTerm]);

    return (
        <Box sx={{ mx: 'auto', p: 2 }}>
            {loading && <CircularProgress />}
            {!loading && (
                <div>
                    <Stack
                        sx={{ justifyContent: 'space-around' }}
                        spacing={{ xs: 1 }}
                        direction='row'
                        useFlexGap
                        flexWrap='wrap'
                    >
                        {books?.map((book) => (
                            <Card
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '15%',
                                    minWidth: 200,
                                }}
                                key={book.name}
                            >
                                <CardMedia
                                    sx={{
                                        height: 250,
                                        backgroundColor: '#004d3f',
                                        backgroundSize: 'contain'
                                    }}
                                    image='http://localhost:3000/book_placeholder.svg'
                                    title={book.name}
                                >
                                    <CardMedia
                                        sx={{
                                            height: 250,
                                        }}
                                        image={book.img}
                                        title={book.name}
                                    ></CardMedia>
                                </CardMedia>
                                <Box sx={{ pt: 2, pl: 2 }}>
                                    {book.genres.map((genre, i) => (
                                        <Chip
                                            key={i}
                                            label={genre}
                                            variant='outlined'
                                            size='small'
                                        />
                                    ))}
                                    <Typography
                                        variant='h6'
                                        component='h2'
                                        sx={{ mt: 2 }}
                                    >
                                        {book.name}
                                    </Typography>
                                    <Typography
                                        variant='subtitle1'
                                        gutterBottom
                                    >
                                        {book.author}
                                    </Typography>
                                </Box>
                                <CardActions
                                    sx={{
                                        justifyContent: 'space-between',
                                        mt: 'auto',
                                        pl: 2,
                                    }}
                                >
                                    <Rating
                                        name='read-only'
                                        value={+book.stars}
                                        readOnly
                                        size='small'
                                    />
                                    <Button
                                        onClick={() =>
                                            navigate(`/book/${book.id}`)
                                        }
                                        size='small'
                                    >
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}
                    </Stack>
                </div>
            )}
        </Box>
    );
}

export default Books;
