import { useState, useEffect } from "react";


import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";

import { postData } from "../../api/lectureEnrollment";
import useSearchData from '../../api/searchlecture'; // Import the custom hook
import { Button } from "@radix-ui/themes";



export function CommandComp() {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [allData, setAllData] = useState([]); // 모든 페이지의 데이터를 저장할 상태 추가

  const { data, isLoading, error } = useSearchData(searchText); // Use the custom hook

  useEffect(() => {
    if (data) {
      setAllData(data);
    }
  }, [data]);

  useEffect(() => {
    if (allData) {
      const filtered = allData.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchText, allData]);

  const onSubmitHandler = (title, id) => {
    console.log("클릭")
    const isEnrolled = window.confirm(`${title} 신청하시겠습니까?`);
    if (isEnrolled) {
      postData(id);
    }
  };

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput
        placeholder="강의를 검색하세요."
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Lectures">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            filteredData.map((box, index) => (
              <div className="" key={index}>
                {box.title && (
                  <Button className="w-full" onClick={() => onSubmitHandler(box.title, box.id)}>
                  <CommandItem className="w-full justify-between flex" >
                    <span>{box.title}</span>
                    <span>강의자: {box.owner.name}</span>
                  </CommandItem>
                  </Button>
                )}
              </div>
            ))
          )}
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </Command>
  );
}