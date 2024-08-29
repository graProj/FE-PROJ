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

import { PostData } from "../../api/lectureEnrollment";
import useSearchData from '../../api/searchlecture'; // Import the custom hook
import { Button } from "@radix-ui/themes";
import {
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogFooter, 
  AlertDialogTitle, 
  AlertDialogDescription, 
  AlertDialogAction, 
 } from "../ui/alert-dialog";



export function CommandComp() {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [allData, setAllData] = useState([]); // 모든 페이지의 데이터를 저장할 상태 추가
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { data, isLoading, error } = useSearchData(searchText); // Use the custom hook
  const mutation = PostData();
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

  const onSubmitHandler = async (title, id) => {
    const isEnrolled = window.confirm(`${title} 신청하시겠습니까?`);
    if (isEnrolled) {
        try {
            const result = await mutation.mutateAsync(id);
            setAlertMessage(result.message); // Set the alert message
            setAlertOpen(true);
        } catch (err) {
          console.log(err.response.data.message)
            setAlertMessage(err.response.data.message)
            setAlertOpen(true);
        }
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
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alert</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            {alertMessage}
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setAlertOpen(false)}>알겠습니다.</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Command>
  );
}