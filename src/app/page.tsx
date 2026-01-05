'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {

  return (
    <div className="flex h-screen items-center justify-center gap-4">
      <Button asChild>
        <Link href="/dashboard">Super Admin Dashboard</Link>
      </Button>
      <Button asChild>
        <Link href="/hr/dashboard">HR Dashboard</Link>
      </Button>
      <Button asChild>
        <Link href="/manager/dashboard">Manager Dashboard</Link>
      </Button>
      <Button asChild variant="outline">
        <Link href="/employee/dashboard">Employee Dashboard</Link>
      </Button>
    </div>
  );
}
