interface Submission {
  form: "contact" | "newsletter" | "venue-request" | "application";
  createdAt: Date;
}

export interface ContactSubmission extends Submission {
  form: "contact";
  name: string;
  email: string;
  message: string;
  subject: string;
}

export interface NewsletterSubmission extends Submission {
  form: "newsletter";
  email: string;
}

export interface VenueRequestSubmission extends Submission {
  form: "venue-request";
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  numberOfGuests: number;
}
