import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a New Note',
        href: '/notes/create',
    },
];

export default function Index() {

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        post('/notes')
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New Note" />
            <div className='m-4'>
                <form onSubmit={handleSubmit}>
                    <div className='gap-4'>
                        <Label>Title</Label>
                        <Input type="text" name="title" value={data.title} onChange={e => setData('title', e.target.value)} />
                        <Label>Description</Label>
                        <Textarea name="description" value={data.description} onChange={e => setData('description', e.target.value)} />
                    </div>
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive" className='mt-4'>
                            <CircleAlert />
                            <AlertTitle>Error!</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}
                    <div className='mt-4'>
                        <Button className='cursor-pointer' type="submit">Create Note</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
