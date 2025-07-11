import { userQueryOptions } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import BoringAvatar from "boring-avatars"
import { IfValue } from "common/if"

export default function AuthInfo() {
  const { data, isPending, error } = useQuery(userQueryOptions)

  if (isPending || error) return

  return (
    <div className="flex items-center transition active:border-border border border-transparent gap-3 hover:bg-accent cursor-pointer select-none rounded-full p-1 pr-3">
      <div className="size-10 overflow-hidden rounded-full border bg-accent">
        <IfValue
          value={data.user.picture}
          renderItem={src => <img src={src} />}
          renderElse={() => <BoringAvatar name={data.user.id} />}
        />
      </div>
      <div className="flex flex-col -space-y-0.5">
        <p className="text-sm font-medium">
          {`${data.user.firstName ?? "User"} ${data.user.lastName ?? data.user.id.slice(-5)}`}
        </p>
        <p className="text-xs text-muted-foreground">{data.user.email}</p>
      </div>
    </div>
  )
}
