import { useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
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
import useDebounce from "../../hooks/Debounce";
import { Search } from "lucide-react";
import { Alert } from "../ui/alert";




export function CommandComp() {
  const [searchText, setSearchText] = useState('');
  const debouncedText = useDebounce(searchText,700);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { data, isLoading } = useSearchData(debouncedText); // Use the custom hook
  const mutation = PostData();
  const onChangeHandler = (e) => {
    setSearchText(e.target.value)
    
  };
  const onSubmitHandler = async (id) => {
        try {
            const result = await mutation.mutateAsync(id);
            setAlertMessage(result.message); // Set the alert message
            setAlertOpen(true);
        } catch (err) {
            setAlertMessage(err.response.data.message)
            setAlertOpen(true);
        }
    
  };

  return (
    <Command className="rounded-lg border shadow-md">
      <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <input className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-slate-400" type="text" value={searchText} onChange={onChangeHandler} />
      </div>
      
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Lectures">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            data && data.map((box, index) => (
              <div className="w-full" key={index}>
                {box.title && (
                  <Alert className="w-full" showicon={
                    <CommandItem className="w-full justify-between flex" >
                    <span>{box.title}</span>
                    <span>강의자: {box.owner.name}</span>
                    </CommandItem>
                  } 
                  title={`${box.title} 강의에 참여 신청하시겠습니까?`}
                  enter={() => onSubmitHandler(box.id)}>
                  
                  </Alert>
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