"use client"

import { useState } from "react"
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, AlertCircle, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import Created from "@/components/login/accountcreated"
import ReCAPTCHA from "react-google-recaptcha";
import { MY_API } from "@/lib/config";
export default function RegisterPage() {
  const [captchaValue, setCaptchaValue] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [prioritizeMainPW, setPrioritizeMainPW] = useState(false);
  const [AllowRegist, setAllowRegist] = useState(false);
  const [Success, setSuccess] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPass = e.target.value;
    setPassword(newPass);

    const isValidLength = newPass.length >= 8;
    setPasswordValid(isValidLength);

    if (!isValidLength) {
      setMessage("Password must be at least 8 characters");
      setAllowRegist(false);
      setPrioritizeMainPW(true);
      return;
    }
    if (confirmPassword && newPass !== confirmPassword) {
      setMessage("Password not match!");
      setConfirmPasswordValid(false);
      setAllowRegist(false);
      setPrioritizeMainPW(true);
      return;
    }

    setMessage("");
    setConfirmPasswordValid(confirmPassword && newPass === confirmPassword);
    setAllowRegist(true);
    setPrioritizeMainPW(false);
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newConfirm = e.target.value;
    setConfirmPassword(newConfirm);
    if(!prioritizeMainPW) {
      const matches = password === newConfirm;
      setConfirmPasswordValid(matches);
      if (matches) {
        setMessage("");
        setAllowRegist (true);
      } else {
        setMessage("Password not match!");
        setAllowRegist (false);
      }
    }
  };
  const register = async () => {
    if(AllowRegist === false) {
      console.log("Read instruction!");
      return;
    }
    if (!captchaValue) {
      setMessage("Please complete the CAPTCHA");
      return;
    }
    const res = await fetch(`${MY_API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, captcha: captchaValue }),
      credentials: "include" // penting untuk cookie
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess(true);
    }
    setMessage(data.error || "User registered!");
  };
  return (
    <>
      {Success ?
        <Created />
        :
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md sm:max-w-lg">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Create Account
                  </CardTitle>
                  <CardDescription>Join Xovan Store and access premium gaming services</CardDescription>
                  {message && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{message}</AlertDescription>
                    </Alert>
                  )}
                </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="username" placeholder="Enter your username" className="pl-10" onChange={(e) => setUsername(e.target.value)}/>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="pl-10 pr-16"
                      onChange={handlePasswordChange}
                    />
                    <div className="absolute right-0 top-0 h-full flex items-center">
                      {password.length > 0 && (
                        <div className="px-2">
                          {passwordValid ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="pl-10 pr-16"
                      onChange={handleConfirmChange}
                    />
                    <div className="absolute right-0 top-0 h-full flex items-center">
                      {confirmPassword.length > 0 && (
                        <div className="px-2">
                          {confirmPasswordValid ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Security Verification</Label>
                  <div className="flex justify-center p-4 border border-border rounded-lg bg-card/50">
                    <ReCAPTCHA
                      size="compact"
                      theme="dark"
                      sitekey="6Le9_rUrAAAAAKyPoUoutBhT3HJBcN1d5Ooq3MWU"
                      onChange={setCaptchaValue}
                    />
                  </div>
                </div>

              <Button className="w-full" size="lg" onClick={register} disabled={!AllowRegist}>
                {!AllowRegist ? (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Complete Form
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:underline font-medium">
                    Sign in
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      }
    </>
  )
}
