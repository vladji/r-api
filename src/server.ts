import app from "./app";
import { connectToDB } from "./config/db";

const PORT = 3001;

export const server = () => {
  connectToDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  });
};
