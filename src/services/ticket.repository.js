export default class TicketRepository {
  constructor(ticketDao) {
    this.ticketDao = ticketDao;
  }

  async createTicket(data) {
    try {
      const ticket = await this.ticketDao.createTicket(data);
      return ticket;
    } catch (error) {
      throw error;
    }
  }
}
