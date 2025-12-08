import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { me, register } from "@/redux/slice/AuthSlice";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";


const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userData, loading } = useSelector(state => state.user)
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: ""
  })

  const inputHandler = (e) => {
    const { value, name } = e.target
    setInputs(prev => ({ ...prev, [name]: value }))
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(register(inputs)).unwrap();
      await dispatch(me()).unwrap()
      navigate("/")
      setInputs({
        name: "",
        email: "",
        password: ""
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData?.name) {
      toast.success(`welcome ${userData?.name}`)
    }
  }, [userData])


  return (
    <div className='min-h-screen flex justify-center items-center'>
      <form className="w-full max-w-md" onSubmit={submitHandler} >
        <Card >
          <CardHeader className={"text-center"}>
            <CardTitle className={"text-xl font-bold"}>Sign Up  to your account</CardTitle>
            <CardDescription>
              Fill the form bellow to Sign up your account
            </CardDescription>

          </CardHeader>
          <CardContent>
            <div className="mb-3 space-y-3">
              <Label htmlFor="name"> Name</Label>
              <Input required={true} type={"text"} className={"name"} value={inputs.name} onChange={inputHandler} id="name" name="name" placeholder="your name" />
            </div>
            <div className="mb-3 space-y-3">
              <Label htmlFor="email">Email</Label>
              <Input required={true} type={"email"} className={"name"} value={inputs.email} onChange={inputHandler} id="email" name="email" placeholder="your email" />
            </div>
            <div className="mb-3 space-y-3">
              <Label htmlFor="password">password</Label>
              <Input required={true} type={"text"} className={"name"} value={inputs.password} onChange={inputHandler} id="password" name="password" placeholder="your password" />
            </div>
            <div className="text-center flex justify-between">
              <p>Already have an account ? <Button className={"p-0"} variant={"link"}> <Link to="/signin" className="font-bold">Sign in</Link></Button></p>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              {loading ? <ClipLoader size={18} color="#ffffff" /> : "Register"}
            </Button>
            <p className="w-full my-2 h-[3px] bg-secondary"></p>
            <Button type={"button"} variant="outline" className="w-full">
              <FcGoogle />    Login with Google
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}

export default Signup