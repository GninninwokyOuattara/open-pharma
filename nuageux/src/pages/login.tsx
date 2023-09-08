import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"


const LoginPage = () => {
    return (
        <div className="h-screen flex flex-col p-2 items-center justify-center w-full">
            <div id="loginForm"
                className="w-full  rounded-lg p-5 flex flex-col items-center w-full"
            >
                <div className="w-full flex flex-col gap-2 items-center mb-6">
                    <h2 className=" font-bold text-center text-4xl ">Open<span className="text-green-500">Pharma</span></h2>
                    <h4 className="text-gray-500">Please enter your credentials</h4>
                </div>



                <LoginForm />
            </div>
        </div>

    )
}



const loginFormSchema = z.object({
    login: z.string().min(5, "Login must be at least 5 characters"),
    password: z.string().min(8, "Password must be at least 5 characters"),

})



const LoginForm = () => {

    const { submitAuthForm, isLoginLoading } = useAuth()

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            login: "",
            password: "",
        }
    })


    const submit = (data: z.infer<typeof loginFormSchema>) => {
        submitAuthForm(data)
    }

    const inputClassName = "border-0 border-b-2 rounded-none focus-visible:outline-none w-full"

    return (
        <Form {...form}>

            <form onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-4 w-full md:w-1/3 items-center">

                <FormField
                    name="login"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem
                            className="w-full"

                        >
                            <FormControl>
                                <Input
                                    placeholder="Username"
                                    className={`${inputClassName}`}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage>{form.formState.errors.login?.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem
                            className="w-full"

                        >
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} className={`${inputClassName}`} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    disabled={form.formState.isSubmitting || isLoginLoading}
                    className="bg-green-500 hover:bg-green-600 rounded-3xl w-2/3 mt-6"
                >
                    {isLoginLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}


                    Log In

                </Button>

            </form>

        </Form>
    )
}


export default LoginPage