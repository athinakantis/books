import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { useState } from 'react';

function Root() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <>
            <Header
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <Outlet context={[searchTerm, setSearchTerm]} />
        </>
    );
}

export default Root;
