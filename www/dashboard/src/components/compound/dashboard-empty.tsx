import DashboardLockInput from "./dashboard-lock-input"
import { SeparatorDots } from "@/components/ui/separator"
import { BookLock } from "lucide-react"

export default function DashboardEmpty() {
  return (
    <section className="w-full h-full rounded-lg border border-dashed bg-accent/40 flex flex-col items-center justify-center text-center py-20 px-6 gap-4">
      <div className="mb-4">
        <BookLock size={64} />
      </div>
      <h1 className="text-2xl font-[550] wide">
        Let’s create your first locked link!
      </h1>
      <p className="text-muted-foreground max-w-lg">
        <a
          href="/"
          className="text-foreground hover:underline underline-offset-2"
        >
          Locked links
        </a>{" "}
        help you collect valuable contact info before sharing your content.
        Create a form, gate a link, and track submissions. .
      </p>
      <SeparatorDots decorative className="my-4" />
      <DashboardLockInput />
    </section>
  )
}
