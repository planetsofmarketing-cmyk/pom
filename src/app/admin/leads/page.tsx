import { redirect } from 'next/navigation';

export default function AdminLeadsPage() {
  redirect(process.env.GOOGLE_SHEET_URL || '/');
}