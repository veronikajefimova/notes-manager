import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Notes',
        href: '/notes',
    },
];

export default function NotesIndex() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notes" />
            <div>
                
            </div>
        </AppLayout>
    );
}
