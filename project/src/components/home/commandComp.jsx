import {
    ArchiveIcon,
} from "@radix-ui/react-icons"
import { useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command"
import { Button } from "@radix-ui/themes";

import useSearchData from "../../api/searchlecture";
import { postData } from "../../api/lectureEnrollment";

export function CommandComp() {
    const [searchText] = useState('');
    const { data, isLoading} = useSearchData(searchText);

    const onSubmitHandler = (title,id) =>{
        const isEnrolled= window.confirm(`${title} 신청하시겠습니까?`);
        if(isEnrolled){
        postData(id);
        }
    
  }
    return (
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="강의를 검색하세요." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Lectures">
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              data.map((box, index) => (
                <div className="w-full justify-between flex" key={index}>
                  {box.title && (
                    <>
                      <CommandItem>
                          <span>{box.title}</span>
                      </CommandItem>
                      <span>강의자: {box.owner.name}</span>
                      <Button type="button" onClick={()=>onSubmitHandler(box.title, box.id)}>
                          <ArchiveIcon />
                      </Button>
                    </>
                  )}
                </div>
              ))
            )}
          </CommandGroup>
          <CommandSeparator />
          
        </CommandList>
      </Command>
    )
  }
  