import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Notes',
        href: '/notes',
    },
];

interface PageProps {
    flash?: {
        message?: string;
        success?: string;
        error?: string;
    };
}

export default function Index() {

    const { flash } = usePage().props as PageProps;

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
        </AppLayout>
    );
}
