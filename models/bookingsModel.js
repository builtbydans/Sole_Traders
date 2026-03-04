db = require("../db/connection");

exports.getBookingsByTraderId = async (traderId, status) => {
  let query = `
    SELECT bookings.*, services.title
    FROM bookings
    JOIN services
      ON bookings.service_id = services.id
    WHERE bookings.trader_id = ?
  `;

  const params = [traderId];

  if (status) {
    query += ` AND bookings.status = ?`;
    params.push(status);
  }

  query += ` ORDER BY requested_date DESC`;

  const [rows] = await db.query(query, params);

  return rows;
};

exports.createNewBooking = async (traderId, data) => {
  let {
    service_id,
    client_name,
    client_email,
    request_date,
    request_time,
    description
  } = data;

  service_id = service_id?.trim();
  client_name = client_name?.trim();
  client_email = client_email?.trim();
  request_date = request_date?.trim();
  request_time = request_time?.trim();
  description = description?.trim();

  if (!service_id || !client_name || !client_email || !request_date || !request_time || !description) {
    throw new Error("Invalid booking data provided");
  }

  return db.query(
    `INSERT INTO bookings
    (service_id, trader_id, client_name, client_email, requested_date, requested_time, job_description, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      service_id,
      traderId,
      client_name,
      client_email,
      request_date,
      request_time,
      description,
      "pending"
    ]
  );
}

exports.updateBookingStatus = async (bookingId, status) => {
  await db.query(
    `UPDATE bookings
     SET status = ?
     WHERE id = ?`,
    [status, bookingId]
  );
};
