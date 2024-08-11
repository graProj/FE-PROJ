import React, { useEffect, useState } from 'react'
import useDebounce from '../../hooks/Debounce';

export default function LecInput ({onSearch}){
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchText = useDebounce(searchTerm, 600);
    
    useEffect(() => {
        onSearch(debouncedSearchText);
    }, [debouncedSearchText, onSearch]); // Added onSearch to the dependency array
    
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    
    return (
        <div className="flex justify-around items-center h-[70px]">
            <div className="w-2/5 flex h-[40px]">
                <input 
                    type="text" 
                    placeholder="강의명 필터링" 
                    onChange={handleSearch}
                    className="w-full border border-[#0ea8f09b] rounded-[10px] pl-[10px] h-full"
                />
            </div>
        </div>
    );
}