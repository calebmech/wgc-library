import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  if (req.method !== "POST") {
    res.statusCode = 404;
    res.end();
    return;
  }

  if (typeof req.body !== "object") {
    res.statusCode = 400;
    res.end();
    return;
  }

  const { books, name } = req.body;

  if (
    !Array.isArray(books) || books.length === 0 || typeof name !== "string" ||
    name.trim().length === 0
  ) {
    res.statusCode = 400;
    res.end();
    return;
  }

  const msg = {
    to: "cmech1@gmail.com", // Change to your recipient
    from: "test@example.com", // Change to your verified sender
    subject: `${books.length} book${
      books.length == 1 ? "" : "s"
    } have been requested by ${name}`,
    text: `${name} has requested the following books: ${books.join(", ")}`,
  };

  try {
    await sgMail.send(msg);

    res.statusCode = 200;
    res.json({ text: "Email sent" });
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end();
  }
};
