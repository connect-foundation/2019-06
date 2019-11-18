const { FRONTEND_SERVER_ADDRESS } = process.env;

const corsOptions = {
  origin: FRONTEND_SERVER_ADDRESS,
  credentials: true,
};

export default corsOptions;
