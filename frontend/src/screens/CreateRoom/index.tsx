import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { CheckedState } from '@radix-ui/react-checkbox'
import React from 'react'

const CreateRoom = () => {
  const [isPrivate, setIsPrivate] = React.useState(false)

  const handleIsPrivateChange = (checked: CheckedState) => {
    setIsPrivate(checked === "indeterminate" ? false : checked)
  }

  return (
    <div className='flex flex-col h-52 justify-between'>
      <Input placeholder='Room Name' />
      <div className='flex flex-row items-center'>
        <label htmlFor='isPrivate' className='mr-2'>Private</label>
        <Checkbox checked={isPrivate} onCheckedChange={handleIsPrivateChange} id='isPrivate' className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70' />
      </div>
      {isPrivate && <Input type='password' placeholder='Password' />}

      <Button>Create Room</Button>
    </div>
  )
}

export default CreateRoom