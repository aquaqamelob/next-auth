import { auth } from "auth"

export const GET = auth((req) => {
  if (req.auth) {

    console.log(JSON.stringify({id: req.auth.user?.id}));

    return Response.json({ data: "Protected data" })
  }

  return Response.json({ message: "Not authenticated" }, { status: 401 })
}) as any // TODO: Fix `auth()` return type
