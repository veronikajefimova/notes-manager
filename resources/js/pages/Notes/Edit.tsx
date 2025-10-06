import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert } from 'lucide-react';

interface Note {
    id: number;
    title: string;
    description: string;
}

interface Props {
    note: Note;
}

export default function Edit({ note } : Props) {

    const { data, setData, put, processing, errors } = useForm({
        title: note.title,
        description: note.description,
    });

    function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        put(`/notes/${note.id}`)
    }

    return (
        <AppLayout breadcrumbs={[{ title: 'Edit a Note', href: `/notes/${note.id}/edit` }]}>
            <Head title="Edit a Note" />
            <div className='m-4'>
                <form onSubmit={handleUpdate}>
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
                        <Button disabled={processing} className='cursor-pointer' type="submit">Update Note</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
