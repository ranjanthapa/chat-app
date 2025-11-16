import app from "./app";
import { connectDB } from "./configs/db.config";

connectDB();
app.listen(5000, () => {
  console.log(`Server running on http://localhost:${5000}`);
});
