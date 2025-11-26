'use client';

import ProtectedDashboardPage from '@/components/ProtectedDashboardPage';
import DashboardContent from './dashboard-page';

export default function DashboardPage() {
    return (
        <ProtectedDashboardPage>
            <DashboardContent />
        </ProtectedDashboardPage>
    );
}
