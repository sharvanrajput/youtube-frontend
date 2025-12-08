import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";


// -----------------------------
// VALIDATIONS
// -----------------------------
const OTPschema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

const Passwordschema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  conPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
}).refine(data => data.password === data.conPassword, {
  message: "Passwords do not match",
  path: ["conPassword"],
});


const ForgotPassword = () => {
  const [step, setStep] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);

  // -----------------------------
  // Step 1 Form - OTP
  // -----------------------------
  const formOTP = useForm({
    resolver: zodResolver(OTPschema),
    defaultValues: {
      otp: "",
    },
  });

  // -----------------------------
  // Step 2 Form - Password Reset
  // -----------------------------
  const formPass = useForm({
    resolver: zodResolver(Passwordschema),
    defaultValues: {
      password: "",
      conPassword: "",
    },
  });

  // -----------------------------
  // SUBMIT OTP
  // -----------------------------
  const SubmitOTP = (data) => {
    console.log("OTP Submitted:", data);
    formOTP.reset();
    setStep(2);
  };

  // -----------------------------
  // SUBMIT PASSWORD RESET
  // -----------------------------
  const SubmitPassword = (data) => {
    console.log("Password Reset:", data);

    // dispatch(resetPassword(data))
    // navigate("/signin")

    formPass.reset();
  };


  return (
    <div className="min-h-screen flex justify-center items-center">

      {/* ----------------------------- */}
      {/* STEP 1 - OTP SCREEN */}
      {/* ----------------------------- */}
      {step === 1 && (
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold">Enter OTP</CardTitle>
            <CardDescription>Enter OTP to reset your password</CardDescription>
          </CardHeader>

          <Form {...formOTP}>
            <form onSubmit={formOTP.handleSubmit(SubmitOTP)}>
              <CardContent>

                <FormField
                  control={formOTP.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem className="flex justify-center">
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          pattern={REGEXP_ONLY_DIGITS}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="text-center mt-3">
                  <p>
                    Back to Sign in{" "}
                    <Button className="p-0" variant="link">
                      <Link to="/signin" className="font-bold">Sign in</Link>
                    </Button>
                  </p>
                </div>

              </CardContent>

              <CardFooter>
                <Button disabled={loading} type="submit" className="w-full">
                  {loading ? <ClipLoader size={18} color="#ffffff" /> : "Verify OTP"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      )}

      {/* ----------------------------- */}
      {/* STEP 2 - RESET PASSWORD */}
      {/* ----------------------------- */}
      {step === 2 && (
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold">Reset Password</CardTitle>
            <CardDescription>Enter your new password</CardDescription>
          </CardHeader>

          <Form {...formPass}>
            <form onSubmit={formPass.handleSubmit(SubmitPassword)}>
              <CardContent className={"space-y-4"}>
                <div className={"space-y-2.5"}>

                  <Label htmlFor="password">password</Label>
                  <FormField
                    control={formPass.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className={"space-y-2.5"}>

                  <Label htmlFor="ConfirmPassword">Confirm Password</Label>

                  <FormField
                    control={formPass.control}
                    name="conPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

              </CardContent>

              <CardFooter className="flex justify-between mt-4">
                <Button onClick={() => setStep(1)} type="button">
                  Back
                </Button>

                <Button disabled={loading} type="submit">
                  {loading ? <ClipLoader size={18} color="#ffffff" /> : "Submit"}
                </Button>
              </CardFooter>

            </form>
          </Form>
        </Card>
      )}

    </div>
  );
};

export default ForgotPassword;
