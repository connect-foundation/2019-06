const { FRONTEND_SERVER_ADDRESS } = process.env;

const corsOptions = {
  origin: FRONTEND_SERVER_ADDRESS,
  allowedHeaders: '*',
  methods: '*',
};

export default corsOptions;
