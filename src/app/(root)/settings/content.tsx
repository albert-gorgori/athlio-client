import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

const SettingsContent = () => {
  return (
    <div className='p-8'>
        <div className="mb-6 ">
            <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
            <p className="text-sm text-muted-foreground">Manage your account and app preferences.</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
            <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="danger">Danger</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>Public information shown on your profile.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="John Doe" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" placeholder="@johndoe" />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea id="bio" placeholder="Tell us a little bit about you" />
                        </div>
                        <div className="flex justify-end">
                            <Button>Save profile</Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="account" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                        <CardDescription>Update your email and password.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="you@example.com" />
                        </div>
                        <Separator />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="password">New password</Label>
                                <Input id="password" type="password" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirm">Confirm password</Label>
                                <Input id="confirm" type="password" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button>Update account</Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>Control your notification preferences.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Email notifications</p>
                                <p className="text-sm text-muted-foreground">Receive updates by email.</p>
                            </div>
                            <Switch id="email-notifs" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Push notifications</p>
                                <p className="text-sm text-muted-foreground">Receive push notifications.</p>
                            </div>
                            <Switch id="push-notifs" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Marketing</p>
                                <p className="text-sm text-muted-foreground">Product updates and offers.</p>
                            </div>
                            <Switch id="marketing-notifs" />
                        </div>
                        <div className="flex justify-end">
                            <Button>Save changes</Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Appearance</CardTitle>
                        <CardDescription>Customize how the app looks.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="theme">Theme</Label>
                            <Select>
                                <SelectTrigger id="theme" className="w-[240px]">
                                    <SelectValue placeholder="Select theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="system">System</SelectItem>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label>Density</Label>
                            <RadioGroup defaultValue="comfortable" className="grid grid-cols-3 gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="compact" id="compact" />
                                    <Label htmlFor="compact">Compact</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="comfortable" id="comfortable" />
                                    <Label htmlFor="comfortable">Comfortable</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="spacious" id="spacious" />
                                    <Label htmlFor="spacious">Spacious</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="flex justify-end">
                            <Button>Apply</Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="danger" className="space-y-4">
                <Card className="border-destructive/40">
                    <CardHeader>
                        <CardTitle>Danger zone</CardTitle>
                        <CardDescription>Irreversible and destructive actions.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="rounded-md border border-destructive/50 bg-destructive/5 p-4">
                            <p className="text-sm text-muted-foreground">
                                Deleting your account will remove all your data permanently.
                            </p>
                            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="ack" />
                                    <Label htmlFor="ack">I understand the consequences</Label>
                                </div>
                                <Button variant="destructive">Delete account</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  )
}

export default SettingsContent