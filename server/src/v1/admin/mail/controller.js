import status from 'http-status';
import service from './service';

const sendReservationMails = async (req, res, next) => {
  try {
    await service.handleReservationMails();
    return res.status(status.NO_CONTENT).end();
  } catch (error) {
    return next(error);
  }
};

export default {
  sendReservationMails,
};
