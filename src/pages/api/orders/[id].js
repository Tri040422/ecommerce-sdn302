import dbConnect from "../../../lib/mongodb";
import Order from "../../../models/Order";
import { getToken } from "next-auth/jwt";

export default async function handler(req, res) {
  await dbConnect();
  const token = await getToken({ req });
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      const order = await Order.findById(id).populate("products.product");
      if (!order || order.user.toString() !== token.sub)
        return res.status(404).json({ message: "Order not found" });
      res.status(200).json(order);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
