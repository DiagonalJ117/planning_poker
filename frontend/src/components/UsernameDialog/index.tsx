import React from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface IDialogProps {
  open: boolean;
  onUsernameSubmit: (username: string) => void;
}


const UsernameDialog = ({open, onUsernameSubmit} : IDialogProps) => {
  const [username, setUsername] = React.useState('')

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter Username</DialogTitle>
          <DialogDescription>Please enter a username for your account.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onUsernameSubmit(username)} type="submit" className="w-full">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UsernameDialog