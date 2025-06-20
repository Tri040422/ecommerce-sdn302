import dbConnect from "../../../lib/mongodb";
import Order from "../../../models/Order";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { products, totalAmount } = req.body;
        const order = await Order.create({
          products,
          totalAmount,
        });
        res.status(201).json(order);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;

    case "GET":
      try {
        const orders = await Order.find({});
        res.status(200).json(orders);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
