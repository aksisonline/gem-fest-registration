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
} from '@react-email/components'

interface TicketProps {
  name: string
  uid: string
}

export default function EventTicket({ name, uid }: TicketProps) {
  const eventName = 'GEM Fest 2024'
  const eventDate = 'Aug 30 2024'
  const eventTime = '3:30 PM'
  const venue = 'Dental Parking'
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=GEMFEST2024-${uid}`

  return (
    <Html>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
      </Head>
      <Body style={main}>
        <Container style={container}>
          <Section style={ticket}>
            <Row>
              <Column>
                <Text style={eventTitle}>{eventName}</Text>
              </Column>
            </Row>

            <Row style={ticketIdRow}>
              <Column>
                <Text style={label}>Ticket ID</Text>
                <Text style={value}>{uid}</Text>
              </Column>
            </Row>

            <Section style={detailsSection}>
              <Row style={detailsRow}>
                <Column style={detailsColumn}>
                  <Text style={label}>Date</Text>
                  <Text style={value}>{eventDate}</Text>
                </Column>
                <Column style={detailsColumn}>
                  <Text style={label}>Time</Text>
                  <Text style={value}>{eventTime}</Text>
                </Column>
              </Row>
              
              <Row style={venueRow}>
                <Column>
                  <Text style={label}>Venue</Text>
                  <Text style={value}>{venue}</Text>
                </Column>
              </Row>

              <Row style={holderRow}>
                <Column>
                  <Text style={label}>Ticket Holder</Text>
                  <Text style={value}>{name}</Text>
                </Column>
              </Row>
            </Section>

            <Row>
              <Column>
                <hr style={divider} />
              </Column>
            </Row>

            <Section style={qrSection}>
              <Text style={qrLabel}>Scan to verify ticket</Text>
              <Img
                src={qrCodeUrl}
                width="150"
                height="150"
                alt="Ticket QR Code"
                style={qrCode}
              />
            </Section>

            <Section style={footer}>
              <Text style={footerText}>
                Please present this ticket at the entrance. This ticket is unique and valid for one-time use only.
              </Text>
              <Text style={footerNote}>
                For any questions or assistance, please contact the GEM Fest team.
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles from the previous example
const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  margin: '40px auto',
  padding: '20px 0',
  width: '100%',
  maxWidth: '480px',
};

const ticket = {
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  borderRadius: '12px',
  padding: '32px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
};

const eventTitle = {
  fontFamily: 'Great Vibes, cursive',
  fontSize: '42px',
  color: '#1a1a1a',
  textAlign: 'center' as const,
  margin: '0 0 32px 0',
  lineHeight: '1.2',
};

const detailsSection = {
  margin: '0 0 24px 0',
};

const detailsRow = {
  margin: '0 0 16px 0',
};

const detailsColumn = {
  width: '50%',
};

const venueRow = {
  margin: '0 0 16px 0',
};

const holderRow = {
  margin: '0 0 24px 0',
};

const label = {
  fontSize: '14px',
  color: '#6b7280',
  marginBottom: '4px',
  fontWeight: '500',
};

const value = {
  fontSize: '16px',
  color: '#111827',
  fontWeight: '600',
  margin: '0',
};

const divider = {
  border: 'none',
  borderTop: '2px dashed #e5e7eb',
  margin: '24px 0',
};

const qrSection = {
  textAlign: 'center' as const,
  margin: '24px 0',
};

const qrCode = {
  display: 'inline-block',
  margin: '0 auto',
};

const footer = {
  textAlign: 'center' as const,
  margin: '24px 0 0 0',
};

const footerText = {
  fontSize: '14px',
  color: '#6b7280',
  margin: '0',
};


const ticketIdRow = {
  margin: '0 0 24px 0',
  borderBottom: '1px solid #e5e7eb',
  paddingBottom: '16px',
};

const qrLabel = {
  fontSize: '14px',
  color: '#6b7280',
  marginBottom: '12px',
};

const footerNote = {
  fontSize: '12px',
  color: '#9ca3af',
  marginTop: '12px',
};

