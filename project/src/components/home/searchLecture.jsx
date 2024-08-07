
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"

import { Button } from "../ui/button"
import { CommandComp } from "./commandComp"


export function SearchModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost"><MagnifyingGlassIcon viewBox="0 0 15 15" height={20} width={20}/>Search...</Button>
      </DialogTrigger>
      <DialogContent className="sm:w-full ">
        <CommandComp/>
      </DialogContent>
    </Dialog>
  )
}
