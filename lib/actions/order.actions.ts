"use server";

import connectToDatabase from "@/lib/mongodb";
import Order from "@/lib/models/Order";

function generateOrderId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `DS-${timestamp}-${random}`;
}

export async function createOrder(data: {
  clerkUserId?: string;
  customer: { name: string; email: string; phone: string };
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
  };
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }[];
  totalAmount: number;
  paymentMethod?: string;
}) {
  try {
    await connectToDatabase();

    const orderId = generateOrderId();

    const order = await Order.create({
      orderId,
      ...data,
    });

    return { success: true, order: JSON.parse(JSON.stringify(order)) };
  } catch (error: any) {
    console.error("Failed to create order:", error);
    return { success: false, error: error.message };
  }
}

export async function getOrders() {
  try {
    await connectToDatabase();
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return { success: true, orders: JSON.parse(JSON.stringify(orders)) };
  } catch (error: any) {
    console.error("Failed to fetch orders:", error);
    return { success: false, error: error.message };
  }
}

export async function getOrderById(orderId: string) {
  try {
    await connectToDatabase();
    const order = await Order.findOne({ orderId });
    if (!order) return { success: false, error: "Order not found" };
    return { success: true, order: JSON.parse(JSON.stringify(order)) };
  } catch (error: any) {
    console.error("Failed to fetch order:", error);
    return { success: false, error: error.message };
  }
}
