import { prisma } from "@/lib/prisma";

const products = [
  {
    name: "Premium Linen Shirt",
    slug: "premium-linen-shirt",
    description: "Crafted from 100% pure linen for breathable comfort.",
    price: 8500,
    salePrice: 7200,
    category: "Clothing",
    stock: 50,
    image: "https://images.unsplash.com/photo-1596399515686-4e0c0a2e5f1f",
    images: [
      "https://images.unsplash.com/photo-1596399515686-4e0c0a2e5f1f",
      "https://images.unsplash.com/photo-1611312575222-8d65d4471180",
    ],
    rating: 4.8,
    reviewCount: 124,
    badge: "Sale",
  },
  {
    name: "Handcrafted Leather Bag",
    slug: "handcrafted-leather-bag",
    description: "Artisanal leather bag made with traditional techniques.",
    price: 12000,
    salePrice: null,
    category: "Handcrafted",
    stock: 30,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa",
    images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa"],
    rating: 4.9,
    reviewCount: 87,
    badge: "Best Seller",
  },
  {
    name: "Minimalist Watch",
    slug: "minimalist-watch",
    description: "Sleek minimalist design with Swiss movement.",
    price: 15000,
    salePrice: null,
    category: "Accessories",
    stock: 25,
    image: "https://images.unsplash.com/photo-1523170335684-f042a50c5c6d",
    images: ["https://images.unsplash.com/photo-1523170335684-f042a50c5c6d"],
    rating: 4.7,
    reviewCount: 156,
    badge: "New",
  },
  {
    name: "Organic Cotton T-Shirt",
    slug: "organic-cotton-tshirt",
    description: "100% certified organic cotton, comfortable and sustainable.",
    price: 3500,
    salePrice: 2800,
    category: "Clothing",
    stock: 100,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"],
    rating: 4.6,
    reviewCount: 203,
    badge: "Sale",
  },
  {
    name: "Utility Canvas Backpack",
    slug: "utility-canvas-backpack",
    description: "Durable canvas backpack with multiple compartments.",
    price: 5500,
    salePrice: null,
    category: "Utility Gear",
    stock: 40,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62"],
    rating: 4.8,
    reviewCount: 95,
    badge: null,
  },
  {
    name: "Wool Blend Sweater",
    slug: "wool-blend-sweater",
    description: "Soft wool blend sweater perfect for any season.",
    price: 9000,
    salePrice: 7200,
    category: "Clothing",
    stock: 35,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6a3c7",
    images: ["https://images.unsplash.com/photo-1620799140408-edc6dcb6a3c7"],
    rating: 4.7,
    reviewCount: 112,
    badge: "Sale",
  },
  {
    name: "Handmade Ceramic Mug",
    slug: "handmade-ceramic-mug",
    description: "Each mug is uniquely handcrafted by artisans.",
    price: 2000,
    salePrice: null,
    category: "Handcrafted",
    stock: 60,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa",
    images: ["https://images.unsplash.com/photo-1610701596007-11502861dcfa"],
    rating: 4.9,
    reviewCount: 78,
    badge: "New",
  },
  {
    name: "Vintage Sunglasses",
    slug: "vintage-sunglasses",
    description: "Classic vintage style sunglasses with UV protection.",
    price: 6500,
    salePrice: 5200,
    category: "Accessories",
    stock: 45,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f",
    images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f"],
    rating: 4.6,
    reviewCount: 134,
    badge: "Sale",
  },
];

async function seed() {
  console.log("Starting database seed...");

  try {
    // Clear existing products
    await prisma.product.deleteMany({});
    console.log("Cleared existing products");

    // Create products
    for (const product of products) {
      await prisma.product.create({
        data: product,
      });
    }

    console.log(`✓ Created ${products.length} products`);
    console.log("Database seed completed successfully!");
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
