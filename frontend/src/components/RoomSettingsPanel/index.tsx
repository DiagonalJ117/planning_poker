import React from "react"
import { useForm, SubmitHandler, Controller} from "react-hook-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select as RootSelectComponent, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { createRoom } from "@/api/services/roomService"
import { CreateRoomInput } from "@/types"
import { useNavigate } from "react-router-dom"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Checkbox } from "../ui/checkbox"

const schema = yup.object({
  roomName: yup.string().required(),
  votingSystem: yup.string().required(),
  isPrivate: yup.boolean().default(false),
}).required()

const RoomSettingsPanel = () => {
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<CreateRoomInput>({
    defaultValues: {
      roomName: '',
      votingSystem: 'fibonacci',
      isPrivate: false,
    },
    resolver: yupResolver(schema)
  })
  const watchPrivate = watch('isPrivate', false);

  const Select = React.forwardRef((props) => (
    <RootSelectComponent {...props} />
  ));

  const handleCreateRoom: SubmitHandler<CreateRoomInput> = async (data: CreateRoomInput) => {
    try {
      const response = await createRoom(data)
      navigate(`/room/${response.id}`)
      return response
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    )
    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>Create Scrum Poker Room</CardTitle>
        <CardDescription>Configure your Scrum Poker session</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(handleCreateRoom)}>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='room-name'>Room Name</Label>
            <Controller
              name='roomName'
              control={control}
              defaultValue=''
              render={({ field }) => (
                <>
                  <Input
                    {...field}
                    id='room-name'
                    placeholder='Enter room name'
                  />
                  {errors.roomName && (
                    <p className='text-red-500'>Room name is required</p>
                  )}
                </>
              )}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='voting-system'>Voting System</Label>
            <Controller
              name='votingSystem'
              control={control}
              render={({ field }) => (
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger id='voting-system'>
                    <SelectValue placeholder='Select voting system' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='fibonacci'>
                      Fibonacci (1, 2, 3, 5, 8, 13, 21)
                    </SelectItem>
                    <SelectItem value='tshirt'>
                      T-Shirt Sizes (XS, S, M, L, XL)
                    </SelectItem>
                    <SelectItem value='power'>
                      Powers of 2 (1, 2, 4, 8, 16, 32, 64)
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className='space-y-2'>
            <div className='flex flex-row items-center'>
              <label htmlFor='isPrivate' className='mr-2'>
                Private
              </label>
              <Controller
                name='isPrivate'
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    value={field.value ? 'true' : 'false'}
                    id='isPrivate'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  />
                )}
              />
            </div>
            {watchPrivate && <Input type='password' placeholder='Password' />}
          </div>
        </CardContent>
        <CardFooter>
          <Button className='w-full' type='submit'>
            Create Room
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default RoomSettingsPanel