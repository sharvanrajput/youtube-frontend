import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

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
import { Button } from "@/components/ui/button";
import { api } from "@/redux/slice/baseurl";
import { ForgotPass, NewPassword, VerifyOtp } from "@/redux/slice/AuthSlice";

/* ------------------ VALIDATION SCHEMAS ------------------ */

const EmailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const OTPschema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

const PasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    conPassword: z.string().min(6, "Confirm password required"),
  })
  .refine((data) => data.password === data.conPassword, {
    message: "Passwords do not match",
    path: ["conPassword"],
  });

/* ------------------ COMPONENT ------------------ */

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch()

  /* ------------------ FORMS ------------------ */

  const emailForm = useForm({
    resolver: zodResolver(EmailSchema),
    defaultValues: { email: "" },
  });

  const otpForm = useForm({
    resolver: zodResolver(OTPschema),
    defaultValues: { otp: "" },
  });

  const passForm = useForm({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: "",
      conPassword: "",
    },
  });

  /* ------------------ API HANDLERS ------------------ */

  // STEP 1 – SEND OTP
  const sendOtp = async (data) => {
    try {
      setEmail(data.email);
      await dispatch(ForgotPass({email})).unwrap()
      setStep(2);
      emailForm.reset();
    } catch (error) {
      console.error(error);
    }
  };

  // STEP 2 – VERIFY OTP
  const verifyOtp = async (data) => {
    try {
      dispatch(VerifyOtp({ email, otp: data.otp })).unwrap()
      setStep(3);
      otpForm.reset();
    } catch (error) {
      console.error(error);
    }
  };

  // STEP 3 – RESET PASSWORD
  const resetPassword = async (data) => {
    try {
      dispatch(NewPassword({
        email,
        password: data.password,
      })).unwrap()
      passForm.reset();
      setStep(1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">

      {/* ---------------- STEP 1 : EMAIL ---------------- */}
      {step === 1 && (
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>Enter your email to receive OTP</CardDescription>
          </CardHeader>

          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(sendOtp)}>
              <CardContent>
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Enter email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>

              <CardFooter>
                <Button className="w-full" disabled={loading}>
                  {loading ? <ClipLoader size={18} color="#fff" /> : "Send OTP"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      )}

      {/* ---------------- STEP 2 : OTP ---------------- */}
      {step === 2 && (
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Verify OTP</CardTitle>
            <CardDescription>OTP sent to {email}</CardDescription>
          </CardHeader>

          <Form {...otpForm}>
            <form onSubmit={otpForm.handleSubmit(verifyOtp)}>
              <CardContent>
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem className="flex justify-center">
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          {...field}
                          pattern={REGEXP_ONLY_DIGITS}
                        >
                          <InputOTPGroup>
                            {[...Array(6)].map((_, i) => (
                              <InputOTPSlot key={i} index={i} />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>

                <Button disabled={loading}>
                  {loading ? <ClipLoader size={18} color="#fff" /> : "Verify OTP"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      )}

      {step === 3 && (
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Create a new password</CardDescription>
          </CardHeader>

          <Form {...passForm}>
            <form onSubmit={passForm.handleSubmit(resetPassword)}>
              <CardContent className="space-y-4">
                <FormField
                  control={passForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="New password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passForm.control}
                  name="conPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>

              <CardFooter>
                <Button className="w-full" disabled={loading}>
                  {loading ? (
                    <ClipLoader size={18} color="#fff" />
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>

          <p className="text-center mt-3 text-sm">
            Back to{" "}
            <Link to="/signin" className="font-semibold underline">
              Sign in
            </Link>
          </p>
        </Card>
      )}
    </div>
  );
};

export default ForgotPassword;
