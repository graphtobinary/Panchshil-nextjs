import { ClientsPageClient } from "@/components/ClientsPage";
import { clientsPageData } from "./clients.data";

export default function ClientsPage() {
  return <ClientsPageClient data={clientsPageData} />;
}
