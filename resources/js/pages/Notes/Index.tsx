import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check } from 'lucide-react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Trash } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Notes',
        href: '/notes',
    },
];

interface Note {
    id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
}

interface PageProps {
    flash?: {
        message?: string;
        success?: string;
        error?: string;
    },
    notes?: Note[];
}

export default function Index() {

    const { notes, flash } = usePage().props as PageProps;

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this note?")) {
            // Perform deletion logic here, e.g., send a request to the server
            console.log(`Note with ID ${id} deleted.`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notes" />
            <div className='m-4'>
                <Link href="/notes/create"><Button>Create Note</Button></Link>
            </div>
            <div className='m-4'>
                <div>
                    {flash?.message && (
                        <Alert variant="default">
                            <Check />
                            <AlertTitle>Notification!</AlertTitle>
                            <AlertDescription>
                                {flash?.message}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
            <div className="m-4">
                {notes && notes.length > 0 ? (
                    <div className="flex flex-wrap gap-4">
                        {notes.map((note) => (
                            <Card key={note.id} className="w-64">
                            <CardHeader>
                                <CardTitle>{note.title}</CardTitle>
                                <CardDescription>{note.description}</CardDescription>
                                <CardAction>
                                    <button
                                        onClick={() => handleDelete(note.id)}
                                        className="cursor-pointer"
                                    >
                                        <Trash className="w-5 h-5 text-red-800" />
                                    </button>
                                </CardAction>
                            </CardHeader>
                            <CardContent>
                                <a
                                href="#"
                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Edit
                                </a>
                            </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p>No notes found.</p>
                )}
            </div>
        </AppLayout>
    );
}
