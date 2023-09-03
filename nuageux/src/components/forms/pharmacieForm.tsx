
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import * as z from "zod"


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PharmacyDataDetailed } from "@/types/dataTypes"
import { Switch } from "../ui/switch"
import ZoneSelectInput from "../zoneSelectInput"



const pharmacySchema = z.object({
    // Name should not be empty
    name: z.string().min(10, { message: "Name must be at least 10 characters" }),
    zone: z.string().min(3, { message: "Zone must be at least 3 characters" }),
    latitude: z.string().min(5, 'Latitude must be at least 5 characters long')
        .regex(/^\d+\.\d+$/, 'Latitude must be a decimal number'),
    longitude: z.string().regex(/^\d+\.\d+$/, 'Longitude must be a decimal number'),
    active: z.boolean(),
    director: z.string(),
    addresses: z.array(z.string()),
    phones: z.array(z.string()),
    description: z.string(),
})

interface IFormProps {
    pharmacy?: PharmacyDataDetailed
}



const PharmacyForm: React.FC<IFormProps> = ({ pharmacy }) => {

    const form = useForm<z.infer<typeof pharmacySchema>>({
        resolver: zodResolver(pharmacySchema),
        defaultValues: {
            name: pharmacy?.name || "",
            zone: pharmacy?.zone || "",
            latitude: pharmacy?.coordinates.latitude.toString() || "0",
            longitude: pharmacy?.coordinates.longitude.toString() || "0",
            active: pharmacy?.active || false,
            director: "",
            addresses: [],
            phones: [],
            description: ""

        }
    })

    const submit = (data: z.infer<typeof pharmacySchema>) => {
        console.log(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl >
                                <Input placeholder="Name" {...field} />
                            </FormControl>
                            {/* <FormDescription>
                                Public display Name
                            </FormDescription> */}
                            <FormMessage>{form.formState.errors.name?.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="zone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Zone</FormLabel>
                            <FormControl >
                                {/* <Input placeholder="Zone" {...field} /> */}
                                <ZoneSelectInput selectFn={field.onChange} />
                            </FormControl>

                            <FormMessage>{form.formState.errors.zone?.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <div className="flex flex-row w-full gap-2">
                    <FormField
                        control={form.control}
                        name="latitude"
                        render={({ field }) => (
                            <FormItem className="w-1/2">
                                <FormLabel>Latitude</FormLabel>
                                <FormControl >
                                    <Input placeholder="latitude" {...field} />
                                </FormControl>
                                <FormMessage>{form.formState.errors.latitude?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="longitude"

                        render={({ field }) => (
                            <FormItem className="w-1/2">
                                <FormLabel>Longitude</FormLabel>
                                <FormControl >
                                    <Input placeholder="longitude" {...field} />
                                </FormControl>
                                <FormMessage>{form.formState.errors.longitude?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => {
                        console.log("field", field);
                        return <FormItem>
                            <FormLabel>Active</FormLabel>
                            <FormControl >
                                {/* <Input type="checkbox" {...field} /> */}
                                <Switch checked={field.value} onChange={field.onChange} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.active?.message}</FormMessage>
                        </FormItem>
                    }}
                />



                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default PharmacyForm