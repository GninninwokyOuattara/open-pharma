
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
import { Textarea } from "@/components/ui/textarea"
import { usePharmacyDialog } from "@/contexts/pharmacyDialogContext"
import { PharmacyDataDetailed } from "@/types/dataTypes"
import { Switch } from "../ui/switch"
import ZoneSelectInput from "../zoneSelectInput"


const coordinateRegex = /^-?([1-8]?[0-9](\.\d+)?|90(\.0+)?)$/


const pharmacySchema = z.object({
    id: z.string(),
    name: z.string().min(10, { message: "Name must be at least 10 characters" }),
    zone: z.string().min(3, { message: "Zone must be at least 3 characters" }),
    latitude: z.string().min(6, { message: "Latitude is not precise enough" }).regex(coordinateRegex, 'Invalid latitude'),
    longitude: z.string().min(6, { message: "Longitude is not precise enough" }).regex(coordinateRegex, 'Invalid longitude'),
    active: z.boolean(),
    director: z.string(),
    addresses: z.string(),
    phones: z.string().regex(/^\d{10}(?:,\s*\d{10})*$/, 'Phones numbers should be ten digits long and separated by commas'),
    description: z.string(),
})

interface IFormProps {
    pharmacy?: PharmacyDataDetailed
}



const PharmacyForm: React.FC<IFormProps> = ({ pharmacy }) => {

    const { submitModification } = usePharmacyDialog()

    const form = useForm<z.infer<typeof pharmacySchema>>({
        resolver: zodResolver(pharmacySchema),
        defaultValues: {
            id: pharmacy?.id || "",
            name: pharmacy?.name || "",
            zone: pharmacy?.zone || "",
            latitude: pharmacy?.coordinates.latitude.toString() || "0",
            longitude: pharmacy?.coordinates.longitude.toString() || "0",
            active: pharmacy?.active || false,
            director: pharmacy?.director || "",
            addresses: pharmacy?.addresses.join(", ") || "",
            phones: pharmacy?.phones.join(", ") || "",
            description: pharmacy?.description || ""

        }
    })

    const submit = (data: z.infer<typeof pharmacySchema>) => {
        const { id, name, zone, latitude, longitude, active, director, addresses, phones, description } = data
        const modifiedPharmacy = {
            id,
            name,
            zone,
            coordinates: {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude)
            },
            active,
            director,
            addresses: addresses.split(", "),
            phones: phones.split(", "),
            description
        }
        console.log(data)
        submitModification(modifiedPharmacy)
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
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl >
                                <Textarea placeholder="Description" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.description?.message}</FormMessage>
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
                    name="director"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Director</FormLabel>
                            <FormControl >
                                <Input placeholder="Director" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.director?.message}</FormMessage>
                        </FormItem>
                    )}

                />

                <FormField
                    control={form.control}
                    name="phones"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phones</FormLabel>
                            <FormControl >
                                <Input placeholder="Phones" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.phones?.message}</FormMessage>
                        </FormItem>
                    )}
                />






                <FormField
                    control={form.control}
                    name="addresses"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Addresses</FormLabel>
                            <FormControl >
                                <Textarea placeholder="Addresses" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.addresses?.message}</FormMessage>
                        </FormItem>
                    )}
                />




                <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => {

                        return <FormItem className="flex flex-row gap-2 items-center justify-between ">
                            <FormLabel>Pharmacy activity state</FormLabel>
                            <FormControl >
                                {/* <Input type="checkbox" {...field} /> */}
                                <Switch checked={field.value}

                                    onClick={() => field.onChange(!field.value)} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.active?.message}</FormMessage>
                        </FormItem>
                    }}
                />





                <Button type="submit" className="">Submit</Button>
            </form>
        </Form>
    )
}

export default PharmacyForm