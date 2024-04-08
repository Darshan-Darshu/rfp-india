import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

function UserModal() {
  return (
    <Card className='w-[350px] mt-8'>
      <CardHeader>
        <CardTitle>PG Consumer</CardTitle>
        <CardDescription>
          To Register/Login you need to select a role
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Select>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select a Role' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value='apple'>Apple</SelectItem>
              <SelectItem value='banana'>Banana</SelectItem>
              <SelectItem value='blueberry'>
                Blueberry
              </SelectItem>
              <SelectItem value='grapes'>Grapes</SelectItem>
              <SelectItem value='pineapple'>
                Pineapple
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline'>Cancel</Button>
        <Button>
          <SignInButton
            mode='modal'
            afterSignInUrl='/'
            afterSignUpUrl='/'
          />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default UserModal;
