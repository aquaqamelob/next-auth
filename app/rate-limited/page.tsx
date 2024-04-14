import { createRateLimit, getRateLimits, increaseRequests } from "@/actions";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function RateLimitedPage() {
  let rateLimits = await getRateLimits();

    return (
      <div className="space-y-2">
        <section>
          <h2 className="text-xl font-bold">Rate limited</h2>
          <form action={createRateLimit}>

          <Button type="submit">Add Rate Limit</Button>
          </form>

          <form action={async () => {
              "use server"
              increaseRequests();
              redirect("/rate-limited");
          }}>

          <Button type="submit">Perform some action</Button>
          </form>

          <div className="flex flex-col rounded-md bg-neutral-100">
          <div className="p-4 font-bold rounded-t-md bg-neutral-200">
            Rate Limits
          </div>
          <pre className="py-6 px-4 whitespace-pre-wrap break-all">
            {JSON.stringify(rateLimits, null, 2)}
          </pre>
        </div>
          
        </section>
      </div>
    )
  }
