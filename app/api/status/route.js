import { getDb } from "../../../lib/firebaseAdmin";

export async function GET() {
  const db = getDb();

  if (!db) {
    return Response.json({
      firebase: "not_configured",
      message: "Set FIREBASE_SERVICE_ACCOUNT_KEY in Vercel project env vars to enable Firestore access.",
    });
  }

  try {
    const collections = await db.listCollections();
    return Response.json({
      firebase: "connected",
      collections: collections.map((c) => c.id),
    });
  } catch (e) {
    return Response.json({ firebase: "error", message: e.message }, { status: 500 });
  }
}
