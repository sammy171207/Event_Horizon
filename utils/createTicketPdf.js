import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const createTicketPdf = (booking, user, event) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ size: "A4", margin: 50 });

            // File path for the generated PDF
            const filePath = path.join(
                "tickets",
                `ticket_${booking._id}.pdf`
            );

            // Ensure tickets folder exists
            if (!fs.existsSync("tickets")) {
                fs.mkdirSync("tickets");
            }

            // Stream the PDF to file
            const stream = fs.createWriteStream(filePath);
            doc.pipe(stream);

            // Title
            doc.fontSize(22).text("🎟 Event Booking Ticket", { align: "center" });
            doc.moveDown();

            // User details
            doc.fontSize(14).text(`Name: ${user.name}`);
            doc.text(`Email: ${user.email}`);
            doc.moveDown();

            // Event details
            doc.fontSize(16).text(`Event: ${event.title}`, { underline: true });
            doc.text(`Date: ${event.date}`);
            doc.text(`Venue: ${event.venue}`);
            doc.moveDown();

            // Booking details
            doc.fontSize(14).text(`Seat Number: ${booking.seatNumber}`);
            doc.text(`Total Amount: ₹${booking.totalamount}`);
            doc.text(`Status: Confirmed`);
            doc.moveDown();

            // Footer
            doc.fontSize(10).text("Thank you for booking with us!", {
                align: "center",
                opacity: 0.7,
            });

            // Finalize PDF
            doc.end();

            // Resolve once stream finishes
            stream.on("finish", () => {
                resolve(filePath);
            });

        } catch (error) {
            reject(error);
        }
    });
};

export default createTicketPdf;
