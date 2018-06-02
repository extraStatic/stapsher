require('./env')

const convict = require('convict')

const configSchema = {
  env: {
    doc: 'The application environment',
    format: ['production', 'staging', 'development', 'test'],
    default: NODE_ENV,
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind the application',
    format: 'port',
    default: 2027,
    env: 'PORT'
  },
  firebase: {
    serviceAccount: {
      doc: 'Path to JSON file with Firebase service account credentials',
      format: String,
      default: null,
      env: 'FIREBASE_SERVICE_ACCOUNT'
    }
  },
  github: {
    app: {
      id: {
        doc: 'GitHub Application ID',
        format: String,
        default: null,
        env: 'GITHUB_APP_ID'
      },
      privateKey: {
        doc: 'Path to the Private Key for GitHub Application',
        format: String,
        default: null,
        env: 'GITHUB_APP_PRIVATE_KEY'
      },
      webhookSecret: {
        doc: 'Secret Token for GitHub Application Webhook',
        format: String,
        default: null,
        env: 'GITHUB_APP_WEBHOOK_SECRET'
      }
    }
  },
  gitlab: {
    bot: {
      accessToken: {
        doc: 'GitLab Bot account Access Token',
        format: String,
        default: null,
        env: 'GITLAB_BOT_ACCESS_TOKEN'
      }
    }
  },
  homeRouteRedirect: {
    doc: 'Redirect URL for home route: `/`',
    format: String,
    default: '',
    env: 'HOME_ROUTE_REDIRECT'
  },
  rsaPrivateKey: {
    doc: 'Path to the RSA Private Key for Stapsher',
    format: String,
    default: null,
    env: 'RSA_PRIVATE_KEY'
  },
  stapsher: {
    cluster: {
      enable: {
        doc: 'Enable Cluster mode',
        format: Boolean,
        default: false,
        env: 'STAPSHER_CLUSTER_MODE'
      },
      instances: {
        doc: 'Number of instances for Cluster mode',
        format: value => {
          if (!Number.isInteger(value) && 'max' !== value)
            throw TypeError('must be a Number or "max"')
        },
        default: 2,
        env: 'STAPSHER_CLUSTER_INSTANCES'
      }
    },
    killTimeout: {
      doc: 'Kill Timeout',
      format: 'nat',
      default: 2000,
      env: 'STAPSHER_KILL_TIMEOUT'
    }
  }
}

const devConfigSchema = {
  localtunnel: {
    subdomain: {
      doc: 'localtunnel subdomain for webhooks',
      format: String,
      default: 'stapsher',
      env: 'LOCALTUNNEL_SUBDOMAIN'
    }
  }
}

if (['development'].includes(NODE_ENV)) {
  for (let [key, value] of Object.entries(devConfigSchema)) {
    configSchema[key] = value
  }
}

const config = convict(configSchema)

config.validate({ allowed: 'strict' })

module.exports = config
