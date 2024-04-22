"use client"

import { DialogTitle } from "@radix-ui/react-dialog"
import { Search } from "~/app/search/search"
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"

const SearchPage = () => {
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>搜索</DialogTitle>
        </DialogHeader>
        <Search />
      </DialogContent>
    </Dialog>
  )
}

export default SearchPage
