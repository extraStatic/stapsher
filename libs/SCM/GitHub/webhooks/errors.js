const defaultErrorInfo = {
  code: 'WEBHOOK_HANDLER_ERROR',
  statusCode: 400
}

const webhookErrorDict = {
  'Event name not passed': {
    code: 'MISSING_EVENT_NAME',
    statusCode: 422
  },
  'Event payload not passed': {
    code: 'MISSING_EVENT_PAYLOAD',
    statusCode: 422
  },
  'Webhook handler error': defaultErrorInfo,
  'signature does not match event payload and secret': {
    code: 'SIGNATURE_VERIFICATION_FAILED',
    statusCode: 422
  }
}

const errorInfo = ({ message }) => webhookErrorDict[message] || defaultErrorInfo

module.exports = { errorInfo }
