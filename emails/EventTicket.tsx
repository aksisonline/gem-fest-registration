/* eslint-disable @next/next/no-page-custom-font */
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Img,
  Row,
  Column,
} from '@react-email/components';

interface TicketProps {
  eventName?: string;
  eventDate?: string;
  eventTime?: string;
  venue?: string;
  ticketHolder?: string;
  ticketId?: string;
  qrCodeUrl?: string;
}

export default function EventTicket({
  eventName = 'GEM Fest 2025',
  eventDate = 'Aug 30 2024',
  eventTime = '3:30 PM',
  venue = 'Dental Parking',
  ticketHolder = 'Guest',
  ticketId = 'GEM2024-001',
  qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=GEMFEST2025${ticketId}`,
}: TicketProps) {
  return (
    <Html>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Inter:wght@400;500;600;700&display=swap"
        />
      </Head>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Welcome Section */}
          <Section style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Hello, {ticketHolder}!</Text>
            <Text style={styles.welcomeMessage}>
              Thank you for registering for <strong>{eventName}</strong>. Below is your e-ticket. Please
              present it at the entrance.
            </Text>
          </Section>

          {/* Ticket Section */}
          <Section style={styles.ticket}>
            {/* Event Name */}
            <Text style={styles.eventTitle}>{eventName}</Text>

            {/* Event Details */}
            <Section style={styles.detailsSection}>
              <Row>
                <Column>
                  <Text style={styles.label}>Date</Text>
                  <Text style={styles.value}>{eventDate}</Text>
                </Column>
                <Column>
                  <Text style={styles.label}>Time</Text>
                  <Text style={styles.value}>{eventTime}</Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text style={styles.label}>Venue</Text>
                  <Text style={styles.value}>{venue}</Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text style={styles.label}>Ticket Holder</Text>
                  <Text style={styles.value}>{ticketHolder}</Text>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Text style={styles.label}>Ticket ID</Text>
                  <Text style={styles.value}>{ticketId}</Text>
                </Column>
              </Row>
            </Section>

            {/* QR Code Section */}
            <Section style={styles.qrSection}>
              <Text style={styles.qrLabel}>Scan to verify your ticket</Text>
              <Img
                src={qrCodeUrl}
                width="150"
                height="150"
                alt="Ticket QR Code"
                style={styles.qrCode}
              />
            </Section>

            {/* Divider */}
            <hr style={styles.divider} />
          </Section>

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              This ticket is valid for one-time use only. For questions, contact us at{' '}
              <strong>support@gemfest.com</strong>.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: '#f9fafb',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '20px 0',
  },
  container: {
    backgroundColor: '#ffffff',
    margin: '40px auto',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    maxWidth: '480px',
  },
  welcomeSection: {
    textAlign: 'center' as const,
    marginBottom: '24px',
  },
  welcomeText: {
    fontSize: '20px',
    fontWeight: '600',
    margin: '0 0 8px',
    color: '#111827',
  },
  welcomeMessage: {
    fontSize: '16px',
    color: '#4b5563',
    lineHeight: '1.5',
  },
  ticket: {
    padding: '24px',
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    textAlign: 'center' as const,
  },
  eventTitle: {
    fontFamily: 'Great Vibes, cursive',
    fontSize: '36px',
    color: '#1a1a1a',
    margin: '0 0 24px',
  },
  detailsSection: {
    marginBottom: '24px',
  },
  label: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '4px',
    fontWeight: '500',
  },
  value: {
    fontSize: '16px',
    color: '#111827',
    fontWeight: '600',
    margin: '0 0 16px',
  },
  qrSection: {
    marginTop: '16px',
    textAlign: 'center' as const,
  },
  qrCode: {
    display: 'inline-block',
    margin: '16px 0',
  },
  qrLabel: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '8px',
  },
  divider: {
    border: 'none',
    borderTop: '2px dashed #e5e7eb',
    margin: '24px 0',
  },
  footer: {
    textAlign: 'center' as const,
    marginTop: '16px',
  },
  footerText: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: '1.5',
  },
};
