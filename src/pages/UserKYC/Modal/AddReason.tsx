import { Button } from '@/components/custom/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface AddReasonProps {
  children?: React.ReactNode
  reason: string
  setReason: (reason: string) => void
  handleClick: (reason: string) => void
  setDialogOpen: (open: boolean) => void
  IsOpen: boolean
}

export const AddReason: React.FC<AddReasonProps> = ({
  handleClick,
  setDialogOpen,
  reason,
  setReason,
  IsOpen,
}) => {
 
  return (
    <Dialog open={IsOpen} onOpenChange={setDialogOpen} >
      <DialogTrigger asChild>
        <DialogContent className='sm:max-w-[425px]' onClick={e=>e.stopPropagation()}>
          <DialogHeader>
            <DialogDescription>
              Please write your reson for rejection
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid  items-center gap-4'>
              <Textarea
                onChange={(e) => {
                  setReason(e.target.value), console.log(e.target.value)
                }}
                placeholder='Enter rejection reason'
                onFocus={(e) => {e.stopPropagation(), e.preventDefault()}}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type='submit'
              onClick={() => {
                handleClick(reason)
                setDialogOpen(false)
              }}
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogTrigger>
    </Dialog>
  )
}
