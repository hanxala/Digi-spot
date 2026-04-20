import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import { products } from "@/data/products";

// Initialize Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    // 1. Connect to Database
    await connectToDatabase();

    // 2. Wipe existing products to prevent duplicates during seeding
    await Product.deleteMany({});
    console.log("Cleared existing products.");

    const seededProducts = [];

    // 3. Process each product sequentially to avoid rate-limiting
    for (const item of products) {
      console.log(`Processing ${item.name}...`);
      const updatedImages = [];

      // 4. Upload each image to Cloudinary
      for (const imgUrl of item.images) {
        try {
          const uploadResponse = await cloudinary.uploader.upload(imgUrl, {
            folder: "digispot/products",
            // Since it's a known Unsplash URL, Cloudinary natively fetches & uploads it
          });
          updatedImages.push(uploadResponse.secure_url);
        } catch (uploadError) {
          console.error(`Failed to upload image: ${imgUrl}`, uploadError);
          // Fallback to original if upload fails
          updatedImages.push(imgUrl);
        }
      }

      // 5. Construct payload matching Mongoose constraints
      const payload = {
        slug: item.slug,
        name: item.name,
        brand: item.brand,
        type: item.type,
        price: item.price,
        condition: item.condition,
        images: updatedImages,
        description: item.description,
        specs: {
          megapixel: item.specs.megapixel,
          sensorFormat: item.specs.sensorFormat,
          mount: item.specs.mount,
          videoResolution: item.specs.videoResolution,
        },
        seller: {
          name: item.seller.name,
          rating: item.seller.rating,
          since: item.seller.since,
        },
        featured: item.featured,
      };

      // 6. Save individually
      const doc = await Product.create(payload);
      seededProducts.push(doc);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${seededProducts.length} products to MongoDB and migrated images to Cloudinary!`,
    });
  } catch (error: any) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
