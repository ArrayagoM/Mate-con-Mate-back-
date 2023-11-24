const limitPayloadSize = (req, res, next) => {
  const MAX_PAYLOAD_SIZE = process.env.MAX_PAYLOAD_SIZE;
  if (
    req.headers[process.env.MAXLENGTH] &&
    parseInt(req.headers[process.env.MAXLENGTH]) > MAX_PAYLOAD_SIZE
  ) {
    return res.status(413).json({ error: 'Payload size exceeds the limit' });
  }
  next();
};

module.exports = { limitPayloadSize };
