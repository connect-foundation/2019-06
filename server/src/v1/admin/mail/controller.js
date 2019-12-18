import status from 'http-status';
import service from './service';

const sendReservationMails = async (req, res, next) => {
  try {
    await service.handleReservationMails();
  } catch (error) {
    return next(error);
  }

  return res.status(status.NO_CONTENT).end();
};

export default {
  sendReservationMails,
};
