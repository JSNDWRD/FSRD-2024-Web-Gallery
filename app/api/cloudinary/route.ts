import { v2 as cloudinary } from "cloudinary";
import { GetImageResponseDto } from "../dto";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      max_results: 500,
    });

    const images: GetImageResponseDto = result.resources.map(
      (resource: {
        public_id: string;
        bytes: number;
        secure_url: string;
        created_at: Date;
        eventName: string;
      }) => ({
        key: resource.public_id,
        size: resource.bytes,
        link: resource.secure_url,
        lastModified: resource.created_at,
        eventName: resource.public_id.split("-")[0].replace("_", " "),
      })
    );

    return Response.json(images, { status: 200 });
  } catch (error) {
    console.error("Error fetching images from Cloudinary:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to fetch images from Cloudinary",
      },
      { status: 500 }
    );
  }
}
