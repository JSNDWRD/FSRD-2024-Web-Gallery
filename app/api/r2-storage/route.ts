import { NextResponse } from "next/server";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2";

export async function GET() {
  try {
    const bucket = process.env.R2_BUCKET_NAME!;
    const publicDevURL = process.env.R2_PUBLIC_DOMAIN!;
    const command = new ListObjectsV2Command({
      Bucket: bucket,
    });

    const res = await r2.send(command);

    const files =
      res.Contents?.map((e) => ({
        key: e.Key,
        size: e.Size,
        link: `${publicDevURL}/${encodeURIComponent(e.Key || "")}`,
        lastModified: e.LastModified,
      })) || [];

    return NextResponse.json({ files });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to list objects" },
      { status: 500 }
    );
  }
}
