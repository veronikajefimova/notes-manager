import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

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
    const { processing, delete: destroy } = useForm();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notes" />
            <div className='m-4'>
                <Link href="/notes/create"><Button className='cursor-pointer'>Create Note</Button></Link>
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

                                {/* Delete button with custom Dialog */}
                                <CardAction>
                                    <Dialog>
                                    <DialogTrigger asChild>
                                        <button
                                        className="cursor-pointer p-1 rounded"
                                        disabled={processing}
                                        >
                                            <Trash className="w-5 h-5 text-red-800" />
                                        </button>
                                    </DialogTrigger>

                                    <DialogContent>
                                        <DialogHeader>
                                        <DialogTitle>Delete Note</DialogTitle>
                                        <DialogDescription>
                                            Are you sure you want to delete this note? This action cannot be undone.
                                        </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter className="flex justify-end gap-2">
                                        <Button
                                            className='cursor-pointer'
                                            variant="outline"
                                            onClick={() => destroy(`/notes/${note.id}`)}
                                            disabled={processing}
                                        >
                                            Yes, delete
                                        </Button>
                                        <DialogClose>
                                            <Button className='cursor-pointer' variant="ghost">
                                                Cancel
                                            </Button>
                                        </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                    </Dialog>
                                </CardAction>
                                </CardHeader>

                                <CardContent>
                                <Link
                                    href={`/notes/${note.id}/edit`}
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Edit
                                </Link>
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
